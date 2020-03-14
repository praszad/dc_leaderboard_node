import express from 'express';
import {
  fetchAllCategories,
  addNewCategory,
  editCategory,
  addNewCategoryItem,
  getCategoryItems
} from '../controllers/categoryController';
const router = express.Router();

router.get('/', fetchAllCategories);
router.post('/getItems', getCategoryItems);
router.post('/', addNewCategory);
router.put('/', editCategory);

router.post('/item', addNewCategoryItem);

export default router;
