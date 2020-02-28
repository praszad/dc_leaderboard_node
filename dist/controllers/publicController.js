"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginValidation = loginValidation;
exports.addTestUser = addTestUser;

var _User = _interopRequireDefault(require("../models/User"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function loginValidation(req, res) {
  try {
    const {
      email,
      password
    } = req.body;
    const response = await _User.default.find({
      email
    });

    if (response.length) {
      const isPasswordValid = await _bcrypt.default.compare(password, response[0].password);

      if (isPasswordValid) {
        const token = await newToken();
        const refToken = await refreshToken();
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
    }, '@@sswqer@', {
      expiresIn: '4h'
    });
  } catch (error) {
    return 'Error Parsing String In JWT';
  }
}

async function refreshToken(data) {
  try {
    return await _jsonwebtoken.default.sign({
      data
    }, '@@sswqer@', {
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