import Employee from '../models/Employee';
import { verifyToken } from './publicController';
import User from '../models/User';
import bcrypt from 'bcrypt';

export async function fetchAllEmployees(req, res) {
  try {
    const query = req.body;
    const token = req.headers?.authorization;
    if (token) {
      const tokenData = await verifyToken(token);
      if (tokenData.error) {
        res.send({ Error: tokenData.error });
        return;
      }
      const response = await Employee.find({});
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
        if (userObjects.length > 1) {
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
