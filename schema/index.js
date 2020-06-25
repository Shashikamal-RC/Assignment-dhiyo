const { buildSchema } = require("graphql")

module.exports = buildSchema(`
        type Document {
            _id : ID!
            name : String!
            document : String!
            creator: User!
            createdAt: String!
            updatedAt: String!
        }

        type AuthData {
            userId: ID!
            token: String!
            tokenExpiration: Int! 
        }

        type User {
            _id : ID!
            email : String!
            password : String
            uploadedDocuments: [Document!]!
            createdAt: String!
            updatedAt: String!
        }

        input DocumentInput {
            name : String!
            document : String!
        }

        input UserInput {
            email: String!
            password: String!
        }

        input UpdatePasswordInput {
            email: String!
            old_password: String!
            new_password: String!
        }

        type RootQuery {
            document: [Document!]!
            login(email : String!, password : String!): AuthData!
            sendMail(email: String!): String
        }

        type RootMutation {
            createDocument(documentInput: DocumentInput): Document
            register(userInput: UserInput): User
            updatePassword(updatePasswordInput: UpdatePasswordInput): String
            forgotPassword(email: String, password: String): String
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `)