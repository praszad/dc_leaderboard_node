import mongoose from 'mongoose';

const categorySchema = mongoose.Schema({
  categoryId: {
    required: true,
    type: String
  },
  categoryName: {
    required: true,
    type: String
  },
  categoryDescription: {
    required: true,
    type: String
  }
});

const Category = mongoose.model('category', categorySchema);

export default Category;
