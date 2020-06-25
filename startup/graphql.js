const graphqlHttp = require('express-graphql')

const graphqlSchema = require("../schema/index")
const graphqlResolvers = require("../resolvers/index")


module.exports = (app) => {
    app.use('/graphql', 
        graphqlHttp({
            schema : graphqlSchema, 
            rootValue: graphqlResolvers,
            graphiql: true
        })
    );
}