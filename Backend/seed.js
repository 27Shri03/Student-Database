const mongoose = require('mongoose');
const user = require('./db/users');

mongoose.connect('mongodb://localhost:27017/Student',{
  serverSelectionTimeoutMS: 60000
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

const userData = [
  { name: 'John Agnihotri', roll: '209', above_18: false },
  { name: 'Donna davis', roll: '102', above_18: true },
  { name: 'Jackie Chan', roll: '34', above_18: true },
  { name: 'Shriram Bhardwaj', roll: '43', above_18: true },
];

async function seedDatabase() {
  try {
    await user.insertMany(userData);
    console.log('Seed successfully...');
  } catch (error) {
    console.error('Seed Error!!!', error);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase().catch((error) => {
  console.error('Error in seeding the database:', error);
});