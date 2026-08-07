const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/gymmanagement';

mongoose.connect(MONGO_URI)
.then(() => console.log('DB connection successful!'))
.catch(err => {
  console.log('DB Connection Error:', err);
});