import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Transaction from '../models/Transactions';
const jwtSecretKey = process.env.JWT_TOKEN_KEY;
export async function loginValidation(req, res) {
  try {
    const { user_id, password } = req.body;
    let userObject = await User.find({ emp_id: user_id });
    if (userObject.length) {
      const isPasswordValid = await bcrypt.compare(
        password,
        userObject[0].password
      );
      if (isPasswordValid) {
        userObject[0].password = '';
        const token = await newToken(userObject[0]);
        let user = userObject[0];
        const refToken = await refreshToken(userObject[0]);
        const karmaPointsData = await Transaction.find({ emp_id: user_id });
        var karmaPoints = 0;
        for (const karma of karmaPointsData) {
          karmaPoints += parseInt(karma.karmaPoints ? karma.karmaPoints : 0);
        }
        user.karmaPoints = karmaPoints;
        res.status(200).send({
          token,
          userData: user,
          refreshToken: refToken
        });
        return;
      } else {
        res.status(204).send('Invalid Password');
      }
    } else {
      res.status(304).send('Invalid Username Or Password');
    }
  } catch (error) {
    res.send(error);
  }
}
async function newToken(data) {
  try {
    return await jwt.sign({ data }, jwtSecretKey, { expiresIn: '4h' });
  } catch (error) {
    return 'Error Parsing String In JWT';
  }
}
export async function verifyToken(token) {
  try {
    return await jwt.verify(token, jwtSecretKey);
  } catch (error) {
    return { error: 'Invalid Token' };
  }
}
async function refreshToken(data) {
  try {
    return await jwt.sign({ data }, jwtSecretKey, { expiresIn: '1d' });
  } catch (error) {
    return 'Error Parsing String In JWT';
  }
}
