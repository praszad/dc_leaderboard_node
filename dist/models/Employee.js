"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const EmployeeDetailSchema = _mongoose.default.Schema({
  points: {
    type: String
  },
  age: {
    type: String
  },
  years_of_experience: {
    required: true,
    type: String
  },
  position: {
    type: String
  }
});

const EmployeeSchema = _mongoose.default.Schema({
  emp_id: {
    required: true,
    type: String
  },
  emp_name: {
    required: true,
    type: String
  },
  details: {
    required: true,
    type: EmployeeDetailSchema
  }
});

const Employee = _mongoose.default.model('employee', EmployeeSchema);

var _default = Employee;
exports.default = _default;