"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchAllEmployees = fetchAllEmployees;

var _Employee = _interopRequireDefault(require("../models/Employee"));

var _publicController = require("./publicController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function fetchAllEmployees(req, res) {
  try {
    var _req$headers;

    const query = req.body;
    const token = (_req$headers = req.headers) === null || _req$headers === void 0 ? void 0 : _req$headers.authorization;

    if (token) {
      const tokenData = await (0, _publicController.verifyToken)(token);

      if (tokenData.error) {
        res.send({
          Error: tokenData.error
        });
        return;
      }

      const response = await _Employee.default.find({});
      res.send({
        response
      });
    }
  } catch (error) {
    res.send(error);
  }
}