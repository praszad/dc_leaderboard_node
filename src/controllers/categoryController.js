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

      if (!categoryItemObject.categoryId) {
        res.send({ Error: 'Category Required' });
        return;
      }
      let lastCategory = await Category.findOne({
        categoryId: categoryItemObject.categoryId
      });

      if (lastCategory?.categoryId) {
        let lastCategoryItem = await CategoryItem.findOne({}).sort({
          itemId: -1
        });

        let lastCategoryItemNum = '';
        if (lastCategoryItem?.itemId) {
          lastCategoryItemNum = lastCategoryItem.itemId.split('_');
          lastCategoryItemNum = parseInt(lastCategoryItemNum[1]) + 1;
        } else {
          lastCategoryItemNum = '0001';
        }
        if (tokenData.data.role_id == '36') {
          categoryItemObject.itemId =
            'CI_' + (lastCategoryItemNum + '').padStart(4, 0);
          const response = await CategoryItem.create(categoryItemObject);
          res.send(response);
          return;
        } else {
          res.send({ Error: 'Your Not Allowed To Create Category' });
        }
      } else {
        res.send('Invalid Category Id or Object');
      }
    }
  } catch (error) {
    res.send(error);
  }
}

export async function getCategoryItems(req, res) {
  try {
    const { categoryId = '' } = req.body;
    const token = req.headers?.authorization;
    if (token) {
      const tokenData = await verifyToken(token);
      if (tokenData.error) {
        res.send({ Error: tokenData.error });
        return;
      }

      if (!categoryId) {
        res.send({ Error: 'Category Required' });
        return;
      }
      let allItems = await CategoryItem.find({
        categoryId
      });

      if (allItems.length) {
        res.send(allItems);
        return;
      } else {
        res.send({ Error: 'No Records Found' });
      }
    } else {
      res.send('Invalid Credentials');
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
      if (tokenData.data.role_id == '36') {
        categoryObject.categoryId =
          'C_' + (lastCategoryNum + '').padStart(3, 0);
        const response = await Category.create(categoryObject);
        res.status(200).send(response);
      } else {
        res.send({ Error: 'Your Not Allowed To Create Category' });
      }
    }
  } catch (error) {
    res.send(error);
  }
}
