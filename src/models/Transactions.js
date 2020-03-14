import mongoose from 'mongoose';

const transactionSchema = mongoose.Schema({
  TR_id: {
    required: true,
    type: String
  },
  emp_id: {
    required: true,
    type: String
  },
  categoryId: {
    required: true,
    type: String
  },
  itemId: {
    required: true,
    type: String
  },
  karmaDateTime: {
    required: true,
    type: String
  },
  karmaPoints: {
    required: true,
    type: String
  },
  refUrl: {
    type: String
  },
  refImage: {
    type: String
  },
  createdBy: {
    required: true,
    type: String
  },
  modifiedBy: {
    required: true,
    type: String
  },
  createdAt: {
    required: true,
    type: String
  },
  modifiedAt: {
    required: true,
    type: String
  }
});

const Transaction = mongoose.model('transactions', transactionSchema);

export default Transaction;
