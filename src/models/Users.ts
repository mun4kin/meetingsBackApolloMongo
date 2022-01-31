import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;
const usersSchema = new Schema({

  email: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true,
  },
  secondName: {
    type: String,
    required: true,
  },
  isAdmin: Boolean,
  password: {
    type: String,
    required: true,
  },
  photo: String
});

const User = mongoose.model('Users', usersSchema);
export default User;
