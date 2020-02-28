import mongoose from 'mongoose';
const EmployeeDetailSchema = mongoose.Schema({
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
