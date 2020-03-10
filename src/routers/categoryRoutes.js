import express from 'express';
import {
  fetchAllCategories,
  addNewCategory,
  editCategory,
  addNewCategoryItem
} from '../controllers/categoryController';
const router = express.Router();

router.get('/', fetchAllCategories);
router.post('/', addNewCategory);
router.put('/', editCategory);

router.post('/item', addNewCategoryItem);

export default router;
