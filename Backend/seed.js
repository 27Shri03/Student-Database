/* 

Welcome to seed.js using this file you can populate your database so that you can test API endpoints using Swagger API testing and work on the data initially.

****************************************************************************

STEP 1: run command " node seed.js " in CMD.
STEP 2: On frontend , log in with the given email and password :
        EMAIL : test@gmail.com
        PASSWORD: test123
STEP 3: In order to use Swagger click on Swagger API testing button.
STEP 4: UUID required to test the endpoint :  d1xY4xdvrtah6akhMo2J00IooXF3

*/

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import user from './db/users.js'

dotenv.config({ path: '.env' });
mongoose.connect(process.env.MONGODB_URI)
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
    const UserData = await user.findOne({userId : "d1xY4xdvrtah6akhMo2J00IooXF3"});
    UserData.students.push(...userData);
    await UserData.save();
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