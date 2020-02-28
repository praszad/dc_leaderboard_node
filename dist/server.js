"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

require("dotenv/config");

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _database = _interopRequireDefault(require("./connections/database"));

var _routers = require("./routers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
app.use((0, _cors.default)());
app.use(_bodyParser.default.json());
const PORT = process.env.PORT || 3636; //Api Routes

app.use('/api/v1', _routers.PublicRouter);
app.use('/api/v1/employee', _routers.EmployeeRouter);

function startApp() {
  try {
    app.listen(PORT, () => {
      console.log('App Connected on Port : ', PORT);
    });
    (0, _database.default)();
  } catch (err) {
    console.log('App Start Error : ', err);
  }
}

var _default = startApp;
exports.default = _default;