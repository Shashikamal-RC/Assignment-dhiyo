const mongoose = require("mongoose")

module. exports = () => {
    mongoose.connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(() => {
        console.log("DB CONNECTED SUCCESFULLY ...!")
    }).catch(() => {
        console.log("DB CONNECTION REFUSED ...!")
    })
}