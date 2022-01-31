import {
  addMeeting, deleteMeetings, getMeetings
} from './meetingsResolvers';
import {
  addUser, getUsers, login
} from './usersResolvers';


const resolvers = {
  Query: {
    getMeetings,
    getUsers,
    login
  },
  Mutation: {
    addUser,
    deleteMeetings,
    addMeeting
  }

};
export default resolvers;
