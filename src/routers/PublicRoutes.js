import express from 'express';
import { loginValidation, addTestUser } from '../controllers/publicController';
const router = express.Router();

router.post('/login', loginValidation);
// router.post('/signin', addTestUser);
export default router;
