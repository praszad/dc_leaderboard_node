import mongoose from 'mongoose';
const EmployeeDetailSchema = mongoose.Schema({
  role: {
    required: true,
    type: String
  },
  date_of_joining: {
    type: String
  },
  position: {
    type: String
  },
  points: {
    type: String
  },
  age: {
    type: String
  }
});
const EmployeeSchema = mongoose.Schema({
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

const Employee = mongoose.model('employee', EmployeeSchema);
export default Employee;
