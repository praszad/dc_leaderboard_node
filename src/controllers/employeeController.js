import Employee from '../models/Employee';
import { verifyToken } from './publicController';

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
