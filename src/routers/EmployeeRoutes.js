import express from 'express';
import {
  fetchAllEmployees,
  addNewUser
} from '../controllers/employeeController';
const router = express.Router();

router.get('/', fetchAllEmployees);
router.post('/', addNewUser);
export default router;
