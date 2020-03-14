import express from 'express';
import {
  addNewTransaction,
  fetchAllTransactions,
  fetchUserTransactions
} from '../controllers/transactionController';
const router = express.Router();

router.post('/', fetchAllTransactions);
router.post('/user', fetchUserTransactions);

router.post('/add', addNewTransaction);

export default router;
