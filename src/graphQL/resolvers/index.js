"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const meetingsResolvers_1 = require("./meetingsResolvers");
const usersResolvers_1 = require("./usersResolvers");
const resolvers = {
    Query: {
        getMeetings: meetingsResolvers_1.getMeetings,
        getUsers: usersResolvers_1.getUsers,
        login: usersResolvers_1.login
    },
    Mutation: {
        addUser: usersResolvers_1.addUser,
        deleteMeetings: meetingsResolvers_1.deleteMeetings,
        addMeeting: meetingsResolvers_1.addMeeting
    }
};
exports.default = resolvers;
