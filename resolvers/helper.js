const User = require("../models/user")
const Document = require("../models/document")

const user = async userId => {
    try{
        const user = await User.findById(userId);
        return {
            ...user._doc,
            uploadedDocuments: documents.bind(this, user._doc.uploadedDocuments)
        }
    }catch(err) {
        throw err;
    }
}

const documents = async (documentIds) => {
    try{
        const document = await Document.find({_id: {$in : documentIds}});
        return documents.map(document => {
            return {
                ...document._doc,
                creator: user.bind(this, document.creator)
            }
        })
    }catch (err) {
        throw err;
    }
}

module.exports.user = user;
module.exports.documents = documents;