import express from 'express';
import {
  fetchAllEmployees,
  addNewUser,
  editNewUser
} from '../controllers/employeeController';
const router = express.Router();

router.get('/', fetchAllEmployees);
router.post('/', addNewUser);
router.post('/change_password', editNewUser);
export default router;
