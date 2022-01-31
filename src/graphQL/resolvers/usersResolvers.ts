import User from '../../models/Users';
import bcrypt from 'bcrypt';
import { ILogin, IUser } from '../../types';
import jwt from 'jsonwebtoken';
/** queries*/
// =========================================================================================================================================
export const getUsers = async () => await User.find();
//* *****************************************************
export const login = async (_:any, { email, password }:{email:string, password:string}):Promise<ILogin> => {
  const user:IUser = await User.findOne({ email });

  if (!user) {
    throw new Error('User does not exist');
  }

  const isEqual = await bcrypt.compare(password, user.password);

  if (!isEqual) {
    throw new Error('Password is incorrect');
  }

  const token = jwt.sign({
    userId: user.id,
    email,
  }, 'superSecretKey', { expiresIn: '1h' });
  return {
    id: user.id || '',
    email,
    token,
    expired: 1
  };
};
/** mutations*/
// =========================================================================================================================================
export const addUser = async (_:any, { email,
  firstName,
  password,
  secondName,
  photo, }:IUser):Promise<IUser> => {
  const existUser = await User.findOne({ email });

  if (existUser) {
    throw new Error('User has already exists');
  }

  const hashedPass = await bcrypt.hash(password, 1);
  const newUser = new User({
    email,
    firstName,
    secondName,

    photo,
    password: hashedPass,
    isAdmin: false
  });
  const result = await newUser.save();
  delete result.password;
  return result;
};
