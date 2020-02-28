import mongoose from 'mongoose';
import 'dotenv/config';
function connect() {
  const host = process.env.DB_HOST;
  const db = process.env.DB_NAME;
  const url = `${host}/${db}`;
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
