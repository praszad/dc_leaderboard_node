"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _publicController = require("../controllers/publicController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.post('/login', _publicController.loginValidation); // router.post('/signin', addTestUser);

var _default = router;
exports.default = _default;