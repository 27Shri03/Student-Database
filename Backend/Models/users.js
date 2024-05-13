import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    students: [
      {
        name: { type: String, required: true },
        roll: { type: String , required : true },
        above_18: { type: Boolean, required: true },
      },
    ],
  }, { collection: 'Users'});

const user = mongoose.model('Users', userSchema);
export default user;