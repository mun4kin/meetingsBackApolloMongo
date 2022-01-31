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
const typeDrefs_1 = require("./graphQL/typeDrefs");
const resolvers_1 = __importDefault(require("./graphQL/resolvers"));
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const isAuth_1 = __importDefault(require("./middleware/isAuth"));
function initServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        app.use((0, cors_1.default)());
        dotenv_1.default.config();
        const apolloServer = new apollo_server_express_1.ApolloServer({
            typeDefs: typeDrefs_1.typeDefs,
            resolvers: resolvers_1.default,
            context: isAuth_1.default
        });
        yield apolloServer.start();
        apolloServer.applyMiddleware({ app, });
        app.use((_req, res) => {
            res.send('Server started');
        });
        const PORT = process.env.PORT || 5000;
        try {
            yield mongoose_1.default.connect(process.env.mongodb || '');
            console.log('connected');
        }
        catch (e) {
            console.log(e);
        }
        app.listen(PORT, () => {
            console.log(`Express server is running on port http://localhost:${PORT}/graphql`);
        });
    });
}
initServer();
