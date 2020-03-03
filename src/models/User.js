import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
  emp_id: {
    type: String,
    required: true
  },
  emp_name: {
    type: String,
    required: true
  },
  mobile: {
    type: String
  },
  role_id: {
    required: true,
    type: String
  },
  date_of_joining: {
    required: true,
    type: String
  },
  position: {
    type: String
  },
  password: {
    type: String
  }
});
const User = mongoose.model('users', UserSchema);
export default User;
