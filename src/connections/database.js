import mongoose from 'mongoose';

function connect() {
  const url = 'mongodb://localhost:27017/dc_dev';
  mongoose.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    err => {
      if (!err) {
        console.log('Mongo Connected Successfully');
      } else {
        console.log('Connection Error');
      }
    }
  );
}
export default connect;
