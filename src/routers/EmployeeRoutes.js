import express from 'express';
import { fetchAllEmployees } from '../controllers/employeeController';
const router = express.Router();

router.get('/', fetchAllEmployees);
export default router;
