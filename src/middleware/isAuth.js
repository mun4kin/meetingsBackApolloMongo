"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isAuth = ({ req }) => {
    const authHeader = (req.headers.authorization || '');
    if (!authHeader) {
        return { isAuth: false };
    }
    const token = authHeader.replace('Bearer ', '');
    if (!token || token === '') {
        return { isAuth: false };
    }
    let decodedToken = '';
    try {
        decodedToken = jsonwebtoken_1.default.verify(token, 'superSecretKey');
    }
    catch (e) {
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
exports.default = isAuth;
const checkAuth = (param) => {
    if (!param.isAuth) {
        throw Error('Token is not correct');
    }
    return param.userId;
};
exports.checkAuth = checkAuth;
