import mongoose from 'mongoose';

const categoryItemSchema = mongoose.Schema({
  categoryId: {
    required: true,
    type: String
  },
  itemName: {
    required: true,
    type: String
  },
  itemId: {
    required: true,
    type: String
  },
  itemDescription: {
    required: true,
    type: String
  },
  karmaPoints: {
    required: true,
    type: String
  }
});

const CategoryItem = mongoose.model('categoryItems', categoryItemSchema);

export default CategoryItem;
