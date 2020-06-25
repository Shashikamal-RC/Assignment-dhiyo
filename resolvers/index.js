const authResolver = require("./auth")
const documentReolver = require("./document")

const rootResolver = {
    ...authResolver,
    ...documentReolver
}

module.exports = rootResolver;