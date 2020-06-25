const User = require("../models/user")
const { user, documents } = require("./helper")
const jwt = require("jsonwebtoken")
var nodemailer = require('nodemailer');

module.exports =  { 
    register : async (args) => {
        try{
            const existing_user = await User.findOne({email: args.userInput.email});
            if(existing_user){
                throw new Error("User already exists")
            }

            const user = new User({
                email: args.userInput.email,
                password : args.userInput.password
            });

            const result = await user.save();
            return {...result._doc}
        }catch(err) {
            throw err
        }
    },
    login: async ({email, password}) => {
        const user = await User.findOne({email: email});
        if(!user){
            throw new Error("User does not exists");
        }
        
        if(!user.authenticate(password)){
            throw new Error("Password is incorrect");
        }

        //create jwt
        const token = jwt.sign({_id: user._id}, process.env.SECRET, {
            expiresIn: '1h'
        });

        return {
            userId: user._id,
            token: token,
            tokenExpiration: 1
        }
    },
    updatePassword: async (args) => {
        const user = await User.findOne({email: args.updatePasswordInput.email});
        if(!user){
            throw new Error("User does not exists");
        }
        
        if(!user.authenticate(args.updatePasswordInput.old_password)){
            throw new Error("Password is incorrect");
        }

        user.password = args.updatePasswordInput.new_password;

        try{
            await user.save();
        }catch(err){
            throw new Error(" Failed to update password")
        }

        return "Password Updated Successfully";

    },
    sendMail: async ({email}) => {
        const user = await User.findOne({email: email});
        if(!user){
            throw new Error("Account does not exists");
        }

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
            user: process.env.MAIL_SENDER_EMAIL,
            pass: process.env.MAIL_SENDER_PASSWORD
            }
        });

        
        //create jwt
        const token = jwt.sign({_id: user._id}, process.env.SECRET, {
            expiresIn: '1h'
        });

        var mailOptions = {
            from: process.env.MAIL_SENDER_EMAIL,
            to: email,
            subject: 'Password recovery mail',
            text: `Hi ${email},
                        Please use this link to recover this password 
                        http://mywebsite/?token=${token}

                    Thank you


                    Note: We can use this token containing url to send password 
                    recovery with that token in header.
                `
        };
        
        try{
            await transporter.sendMail(mailOptions);
        }catch(err) {
            console.log("unable to send email", email)
            throw err;
        }

        return "Mail sent successfully, check for instructions to recover password"

    },
    forgotPassword: async ({email, password}, req) => {
        if(!req.isAuth){
            throw new Error("Please pass token to recover password");
        }

        const user = await User.findOne({_id: req.userId, email: email});

        if(!user){
            throw new Error("Account does not exists");
        }
        
        user.password = password;

        try{
            await user.save();
        }catch(err){
            throw new Error(" Failed to update password")
        }

        return "Password Updated Successfully, Please login with your new passwords";
    }

}