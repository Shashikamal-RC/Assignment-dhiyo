const mongoose = require('mongoose')
const Schema = mongoose.Schema

const documentSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    document : {
        data: Buffer,
        contentType: String
    },
    creator :{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true})

module.exports = mongoose.model('Document', documentSchema);