const  { createTransport } = require('nodemailer') ;
require("dotenv").config();

const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: 'sudoswiftabhinav@gmail.com',
    pass: process.env.GMAIL_PWD
  }
});

const sendEmail = (to, body) => {
  const mailOptions = {
    from: 'sudoswiftabhinav@gmail.com',
    to,
    subject :'Message From Indigo',
    text :body  
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};


module.exports=sendEmail