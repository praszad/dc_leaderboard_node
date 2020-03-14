import { verifyToken } from './publicController';
import User from '../models/User';
import bcrypt from 'bcrypt';

export async function fetchAllEmployees(req, res) {
  try {
    const { user_id, page = 1, size = 2 } = req.body;
    const token = req.headers?.authorization;
    const skip = parseInt(page - 1) * parseInt(size);
    if (token) {
      const tokenData = await verifyToken(token);
      if (tokenData.error) {
        res.send({ Error: tokenData.error });
        return;
      }
      const responseData = await User.find({
        emp_id: new RegExp(user_id, 'i')
      });
      const response = await User.find({
        emp_id: new RegExp(user_id, 'i')
      })
        .skip(skip)
        .limit(parseInt(size));

      res.send({ response, totalCount: responseData.length });
    }
  } catch (error) {
    res.send(error);
  }
}

export async function fetchAllUsers(req, res) {
  try {
    const token = req.headers?.authorization;
    if (token) {
      const tokenData = await verifyToken(token);
      if (tokenData.error) {
        res.send({ Error: tokenData.error });
        return;
      }
      const response = await User.find({});
      res.send(response);
    }
  } catch (error) {
    res.send(error);
  }
}

export async function addNewUser(req, res) {
  try {
    const userObject = req.body;
    const token = req.headers?.authorization;
    if (token) {
      const tokenData = await verifyToken(token);
      if (tokenData.error) {
        res.send({ Error: tokenData.error });
        return;
      }
      if (tokenData.data.role_id == '36') {
        userObject.password = await bcrypt.hash(req.body.user_id, 10);
        userObject.emp_id = userObject.user_id;
        let userObjects = await User.find({ emp_id: userObject.user_id });
        if (userObjects.length >= 1) {
          res.status(400).send('User Id Already Exists');
        }
        const response = await User.create(userObject);
        res.send(response);
        return;
      }
      res.send('Your Not Auth To Create Users');
    } else {
      res.send('Invalid Header With Authorization');
    }
  } catch (error) {
    res.send(error);
  }
}

export async function editNewUser(req, res) {
  try {
    const token = req.headers?.authorization;
    if (token) {
      const tokenData = await verifyToken(token);
      if (tokenData.error) {
        res.send({ Error: tokenData.error });
        return;
      }
      let userObject = req.body;
      let userDbObject = await User.find({ emp_id: userObject.user_id });
      const isPasswordValid = await bcrypt.compare(
        userObject.password,
        userDbObject[0].password
      );
      if (isPasswordValid) {
        userDbObject[0].password = await bcrypt.hash(
          userObject.newPassword,
          10
        );
        const response = await User.updateOne(
          { emp_id: userObject.user_id },
          userDbObject[0]
        );
        res.send({
          response
        });
        return;
      } else {
        res.send('Invalid Password or Query');
      }
    }
  } catch (error) {
    res.send(error);
  }
}
