"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_core_1 = require("apollo-server-core");
const typeDefs = (0, apollo_server_core_1.gql) `
    type Meetings {
        id:ID!
        name: String!
        description: String,
        creator:User,
        timeStamp:Int!,
        users:[User]
    }
    type Login {
        id:ID!
        email: String!
        token: String!
        expired:Int!
    }
    type User {
        id:ID!
        email: String!
        firstName: String!
        secondName:String!
        isAdmin:Boolean
        password:String
        photo:String
    }
    #=======================
    type Query {
        getMeetings: [Meetings]
        getUsers:[User]
        login(email:String!,password:String!):Login
    }
     type Mutation{
         addUser(email:String!,firstName: String!,secondName:String!, password:String,photo:String):User
         addMeeting(name:String,description:String, timeStamp:Int, users:[ID]):Meetings
         deleteMeetings:Boolean
     }
`;
exports.default = typeDefs;
