"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function connect() {
  const url = 'mongodb://localhost:27017/dc_dev';

  _mongoose.default.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, err => {
    if (!err) {
      console.log('Mongo Connected Successfully');
    } else {
      console.log('Connection Error');
    }
  });
}

var _default = connect;
exports.default = _default;