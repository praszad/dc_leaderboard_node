import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export async function loginValidation(req, res) {
  try {
    const { email, password } = req.body;
    const response = await User.find({ email });
    if (response.length) {
      const isPasswordValid = await bcrypt.compare(
        password,
        response[0].password
      );
      if (isPasswordValid) {
        const token = await newToken();
        const refToken = await refreshToken();
        res.send({ token, refreshToken: refToken });
        return;
      } else {
        res.send('Invalid Password');
      }
    }
  } catch (error) {
    res.send(error);
  }
}
async function newToken(data) {
  try {
    return await jwt.sign({ data }, '@@sswqer@', { expiresIn: '4h' });
  } catch (error) {
    return 'Error Parsing String In JWT';
  }
}
async function refreshToken(data) {
  try {
    return await jwt.sign({ data }, '@@sswqer@', { expiresIn: '1d' });
  } catch (error) {
    return 'Error Parsing String In JWT';
  }
}
export async function addTestUser(req, res) {
  try {
    const userObject = req.body;
    userObject.password = await bcrypt.hash(req.body.password, 10);
    const response = await User.create(userObject);
    res.send(response);
  } catch (error) {
    res.send(error);
  }
}
