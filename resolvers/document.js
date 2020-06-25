const Document = require("../models/document")
const { user, documents } = require("./helper")

module.exports =  { 
    document: async () => {
        try{
            const documents = await Document.find();
            return documents.map(document => {
                return {
                    ...document._doc,
                    creator: user.bind(this, document._doc.creator)
                }
            })
        }catch(err) {
            throw err
        }
    },

    createDocument: async (args, req) => {
 
        if(!req.isAuth){
            throw new Error("Unauthenticated");
        }

        const document = new Document({
            name : args.eventInput.name,
            document: args.eventInput.document,
            creator: 'user id'
        });

        let uploadedDocument;
        try{
            const result = await document.save();
            uploadedDocument =  {
                ...result._doc,
                creator : user.bind(this, result._doc.creator)
            }

            const user = await User.findById('userId');

            if(!user){
                throw new Error("user not found");
            }
            user.uploadedDocuments.push(document);
            await user.save();
            return uploadedDocument;
        }catch(err){
            throw err
        }
    }
}