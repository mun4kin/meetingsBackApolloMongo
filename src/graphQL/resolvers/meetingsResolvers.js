"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMeetings = exports.addMeeting = exports.getMeetings = void 0;
const models_1 = require("../../models");
const isAuth_1 = require("../../middleware/isAuth");
/** queries*/
// ====================================================================
const getMeetings = (_, __, req) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUserID = (0, isAuth_1.checkAuth)(req);
    return models_1.Meetings.find({ 'users': { $elemMatch: { $eq: currentUserID } } })
        .populate('creator')
        .populate('users');
});
exports.getMeetings = getMeetings;
/** mutations*/
// ====================================================================
const addMeeting = (_, { name, description, timeStamp, users }, req) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUserID = (0, isAuth_1.checkAuth)(req);
    const newMeeting = new models_1.Meetings({
        name,
        timeStamp,
        description,
        creator: currentUserID,
        users: [currentUserID, ...users]
    });
    yield newMeeting.save();
    return newMeeting;
});
exports.addMeeting = addMeeting;
//* *******************************************
const deleteMeetings = (_, _args, _req) => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.Meetings.deleteMany();
    return true;
});
exports.deleteMeetings = deleteMeetings;
