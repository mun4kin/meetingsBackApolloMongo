import jwt from 'jsonwebtoken';
export interface IAuthReq {
  isAuth:boolean,
  userId?:string
}

const isAuth = ({ req }:any):IAuthReq => {

  const authHeader = (req.headers.authorization || '');


  if (!authHeader) {
    return { isAuth: false };
  }


  const token = authHeader.replace('Bearer ', '');


  if (!token || token === '') {
    return { isAuth: false };
  }

  let decodedToken:any = '';
  try {
    decodedToken = jwt.verify(token, 'superSecretKey');
  } catch (e) {
    return { isAuth: false };
  }

  console.log(decodedToken);

  if (!decodedToken) {
    return { isAuth: false };
  }

  return {
    isAuth: true,
    userId: decodedToken.userId
  };
};
export default isAuth;


export const checkAuth = (param:IAuthReq):string => {
  if (!param.isAuth) {
    throw Error('Token is not correct');
  }

  return param.userId as string;
};
