import { verifyToken } from './publicController';
import bcrypt from 'bcrypt';
import Transaction from '../models/Transactions';
import { response } from 'express';

export async function fetchAllTransactions(req, res) {
  try {
    const { user_id = '' } = req.body;
    const token = req.headers?.authorization;
    if (token) {
      const tokenData = await verifyToken(token);
      if (tokenData.error) {
        res.send({ Error: tokenData.error });
        return;
      }
      let transactions = [];
      if (user_id) {
        transactions = await Transaction.find({
          emp_id: new RegExp(user_id, 'i')
        });
      } else {
        transactions = await Transaction.find();
      }

      if (transactions.length) {
        let response = {};
        for (const transfer of transactions) {
          let preValue = response[transfer.emp_id]
            ? parseInt(response[transfer.emp_id])
            : 0;
          let points = transfer.karmaPoints
            ? parseInt(transfer.karmaPoints)
            : 0;
          response[transfer.emp_id] = preValue + points;
        }
        let responseArray = [];
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            responseArray.push({ emp_id: key, karmaPoints: response[key] });
          }
        }
        const result = responseArray
          .sort((a, b) => b.karmaPoints - a.karmaPoints)
          .slice(0, 20);
        res.send(result);
        return;
      }
      res.send({ Error: 'No Records Found' });
    }
  } catch (error) {
    res.send(error);
  }
}
export async function addNewTransaction(req, res) {
  try {
    const reqObject = req.body;
    const token = req.headers?.authorization;
    if (token) {
      const tokenData = await verifyToken(token);
      if (tokenData.error) {
        res.send({ Error: tokenData.error });
        return;
      }
      if (tokenData.data.role_id == '36') {
        const lastTransaction = await Transaction.find({}).sort({ TR_id: -1 });
        let lastTransactionId = '';
        if (lastTransaction.length) {
          lastTransactionId = lastTransaction[0].TR_id.split('_');
          lastTransactionId = parseInt(lastTransactionId[1]) + 1;
        } else {
          lastTransactionId = '00000001';
        }
        if (tokenData.data.role_id == '36') {
          reqObject.modifiedBy = reqObject.createdBy;
          reqObject.modifiedAt = reqObject.createdAt;

          reqObject.TR_id = 'TR_' + (lastTransactionId + '').padStart(8, 0);
          const response = await Transaction.create(reqObject);
          res.send(response);
          return;
        } else {
          res.send({ Error: 'Your Not Allowed To Create Category' });
        }
      }
      res.send('Your Not Auth To Create Users');
    } else {
      res.send('Invalid Header With Authorization');
    }
  } catch (error) {
    res.send(error);
  }
}

export async function fetchUserTransactions(req, res) {
  try {
    const { user_id = '' } = req.body;
    const token = req.headers?.authorization;
    if (token) {
      const tokenData = await verifyToken(token);
      if (tokenData.error) {
        res.send({ Error: tokenData.error });
        return;
      }
      let transactions = [];
      if (user_id) {
        transactions = await Transaction.find({
          emp_id: user_id
        });
      } else {
        res.send({ Error: 'User Transaction Not Found' });
        return;
      }

      if (transactions.length) {
        res.send(transactions);
        return;
      }
      res.send({ Error: 'No Records Found' });
    }
  } catch (error) {
    res.send(error);
  }
}
