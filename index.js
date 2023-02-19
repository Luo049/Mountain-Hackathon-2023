const express = require("express")
const app = express()
const nodemailer = require("nodemailer")
let PORT = process.env.PORT || 3000

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user:"projectplantscan@gmail.com",
        pass:"doagmudeebbdyxnh",
    },
    tls:{
        rejectUnauthorized: false,
    }
})

let mailOptions = {
    from: "projectplantscan@gmail.com",
    //need to change to: email to be able to append email from src folder
    to: "boomworldfx720@gmail.com",
    subject:"Your CHATGPT Reply",
    //need to append text from the last line of the translator 
    text: "poopy kkkkkkkkkkk",
}

transporter.sendMail(mailOptions, function(err, success){
    if(err){
        console.log(err)
    }
    else{
        console.log("email sent successfully!")
    }
})