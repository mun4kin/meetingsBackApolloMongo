import { Meetings } from '../../models';
import { IMeeting } from '../../types';
import { checkAuth, IAuthReq } from '../../middleware/isAuth';


/** queries*/
// ====================================================================
export const getMeetings = async(_: any, __:any, req: IAuthReq) => {
  const currentUserID = checkAuth(req);
  return Meetings.find({ 'users': { $elemMatch: { $eq: currentUserID } } })
    .populate('creator')
    .populate('users');
};


/** mutations*/
// ====================================================================
export const addMeeting = async(_: any, { name, description, timeStamp, users }:IMeeting, req: IAuthReq) => {
  const currentUserID = checkAuth(req);
  const newMeeting = new Meetings({
    name,
    timeStamp,
    description,
    creator: currentUserID,
    users: [currentUserID, ...users]

  });
  await newMeeting.save();
  return newMeeting;
};
//* *******************************************
export const deleteMeetings = async(_:any, _args:any, _req:any) => {
  await Meetings.deleteMany();
  return true;
};
