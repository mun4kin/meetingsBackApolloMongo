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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = exports.login = exports.getUsers = void 0;
const Users_1 = __importDefault(require("../../models/Users"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/** queries*/
// =========================================================================================================================================
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () { return yield Users_1.default.find(); });
exports.getUsers = getUsers;
//* *****************************************************
const login = (_, { email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield Users_1.default.findOne({ email });
    if (!user) {
        throw new Error('User does not exist');
    }
    const isEqual = yield bcrypt_1.default.compare(password, user.password);
    if (!isEqual) {
        throw new Error('Password is incorrect');
    }
    const token = jsonwebtoken_1.default.sign({
        userId: user.id,
        email,
    }, 'superSecretKey', { expiresIn: '1h' });
    return {
        id: user.id || '',
        email,
        token,
        expired: 1
    };
});
exports.login = login;
/** mutations*/
// =========================================================================================================================================
const addUser = (_, { email, firstName, password, secondName, photo, }) => __awaiter(void 0, void 0, void 0, function* () {
    const existUser = yield Users_1.default.findOne({ email });
    if (existUser) {
        throw new Error('User has already exists');
    }
    const hashedPass = yield bcrypt_1.default.hash(password, 1);
    const newUser = new Users_1.default({
        email,
        firstName,
        secondName,
        photo,
        password: hashedPass,
        isAdmin: false
    });
    const result = yield newUser.save();
    delete result.password;
    return result;
});
exports.addUser = addUser;
