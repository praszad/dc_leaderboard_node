"use strict";

var _PublicRoutes = _interopRequireDefault(require("./PublicRoutes"));

var _EmployeeRoutes = _interopRequireDefault(require("./EmployeeRoutes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  PublicRouter: _PublicRoutes.default,
  EmployeeRouter: _EmployeeRoutes.default
};