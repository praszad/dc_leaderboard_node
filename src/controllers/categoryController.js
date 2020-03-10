import Category from '../models/Category';
import { verifyToken } from './publicController';
import CategoryItem from '../models/CategoryItem';

export async function addNewCategoryItem(req, res) {
  try {
    const categoryItemObject = req.body;
    const token = req.headers?.authorization;
    if (token) {
      const tokenData = await verifyToken(token);
      if (tokenData.error) {
        res.send({ Error: tokenData.error });
        return;
      }
      let lastCategory = await Category.find({
        categoryId: categoryItemObject.categoryId
      })
        .sort({ itemId: -1 })
        .limit(1);
      if (lastCategory.length) {
        let lastCategoryItem = await CategoryItem.find({})
          .sort({ itemId: -1 })
          .limit(1);

        let lastCategoryItemNum = '';
        if (lastCategoryItem.length) {
          lastCategoryItemNum = lastCategoryItem[0].itemId.split('_');
          lastCategoryItemNum = parseInt(lastCategoryItemNum[1]) + 1;
        } else {
          lastCategoryItemNum = '0001';
        }

        categoryItemObject.itemId =
          'CI_' + (lastCategoryItemNum + '').padStart(4, 0);
        const response = await CategoryItem.create(categoryItemObject);
        res.send(response);
      } else {
        res.send('Invalid Category Id');
      }
    }
  } catch (error) {
    res.send(error);
  }
}

export async function fetchAllCategories(req, res) {
  try {
    const query = req.body;
    const token = req.headers?.authorization;
    if (token) {
      const tokenData = await verifyToken(token);
      if (tokenData.error) {
        res.send({ Error: tokenData.error });
        return;
      }
      const response = await Category.find({});
      res.send(response);
    }
  } catch (error) {
    res.send(error);
  }
}

export async function editCategory(req, res) {
  try {
    const categoryObject = req.body;
    const token = req.headers?.authorization;
    if (token) {
      const tokenData = await verifyToken(token);
      if (tokenData.error) {
        res.send({ Error: tokenData.error });
        return;
      }
      let lastCategory = await Category.find({
        categoryId: categoryObject.categoryId
      });

      if (lastCategory.length) {
        let modifiedCategory = lastCategory[0];
        modifiedCategory.categoryName = categoryObject.categoryName
          ? categoryObject.categoryName
          : modifiedCategory.categoryName;
        modifiedCategory.categoryDescription = categoryObject.categoryDescription
          ? categoryObject.categoryDescription
          : modifiedCategory.categoryDescription;
        console.log(modifiedCategory);

        const response = await Category.updateOne(
          { categoryId: categoryObject.categoryId },
          modifiedCategory
        );
        res.send(response);
        return;
      } else {
        res.send('Invalid Object Category');
      }
    }
  } catch (error) {
    res.send(error);
  }
}

export async function addNewCategory(req, res) {
  try {
    const categoryObject = req.body;
    const token = req.headers?.authorization;
    if (token) {
      const tokenData = await verifyToken(token);
      if (tokenData.error) {
        res.send({ Error: tokenData.error });
        return;
      }
      let lastCategory = await Category.find({})
        .sort({ categoryId: -1 })
        .limit(1);
      let lastCategoryNum = '';
      if (lastCategory.length) {
        lastCategoryNum = lastCategory[0].categoryId.split('_');
        lastCategoryNum = parseInt(lastCategoryNum[1]) + 1;
      } else {
        lastCategoryNum = '001';
      }
      categoryObject.categoryId = 'C_' + (lastCategoryNum + '').padStart(3, 0);
      const response = await Category.create(categoryObject);
      res.send(response);
    }
  } catch (error) {
    res.send(error);
  }
}
