"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginValidation = loginValidation;
exports.verifyToken = verifyToken;
exports.addTestUser = addTestUser;

var _User = _interopRequireDefault(require("../models/User"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const jwtSecretKey = process.env.JWT_TOKEN_KEY;

async function loginValidation(req, res) {
  try {
    const {
      email,
      password
    } = req.body;
    let userObject = await _User.default.find({
      email
    });

    if (userObject.length) {
      const isPasswordValid = await _bcrypt.default.compare(password, userObject[0].password);

      if (isPasswordValid) {
        userObject[0].password = '';
        const token = await newToken(userObject[0]);
        const refToken = await refreshToken(userObject[0]);
        res.send({
          token,
          refreshToken: refToken
        });
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
    return await _jsonwebtoken.default.sign({
      data
    }, jwtSecretKey, {
      expiresIn: '4h'
    });
  } catch (error) {
    return 'Error Parsing String In JWT';
  }
}

async function verifyToken(token) {
  try {
    return await _jsonwebtoken.default.verify(token, jwtSecretKey);
  } catch (error) {
    return {
      error: 'Invalid Token'
    };
  }
}

async function refreshToken(data) {
  try {
    return await _jsonwebtoken.default.sign({
      data
    }, jwtSecretKey, {
      expiresIn: '1d'
    });
  } catch (error) {
    return 'Error Parsing String In JWT';
  }
}

async function addTestUser(req, res) {
  try {
    const userObject = req.body;
    userObject.password = await _bcrypt.default.hash(req.body.password, 10);
    const response = await _User.default.create(userObject);
    res.send(response);
  } catch (error) {
    res.send(error);
  }
}