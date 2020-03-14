import express from 'express';
import {
  fetchAllEmployees,
  fetchAllUsers,
  addNewUser,
  editNewUser
} from '../controllers/employeeController';
const router = express.Router();

router.get('/', fetchAllUsers);
router.post('/', fetchAllEmployees);
router.post('/add', addNewUser);
router.post('/change_password', editNewUser);
export default router;
