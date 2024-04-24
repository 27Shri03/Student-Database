const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: '.env' });
const mongodbUri = process.env.MONGODB_URI;
if (!mongodbUri) {
  console.error('MONGODB_URI environment variable is not defined.');
  process.exit(1);
}

mongoose.connect(mongodbUri)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('Error connecting to MongoDB:', err));