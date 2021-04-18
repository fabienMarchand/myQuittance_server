require("dotenv").config();
var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');

// This is your API key that you retrieve from www.mailgun.com/cp (free up to 10K monthly emails)
var auth = {
  auth: {
    api_key: process.env.MAILGUN_KEY,
    domain: process.env.MAILGUN_DOMAIN
  }
}

var nodemailerMailgun = nodemailer.createTransport(mg(auth));


nodemailerMailgun.sendMail({
  from: 'marchaf@gmail.com',
  to: 'marchaf@gmail.com', // An array if you have multiple recipients.
  subject: 'Hey you, awesome!',
  text: 'Mailgun rocks, pow pow!',
  /// Soit je met le txt soit un peu de forme en html
 /// html: '<h1>YOUUUHOUUUU!!!</h1>',
}, function (err, info) {
  if (err) {
    console.error('Error: ' + err);
  }
  else {
    console.log('Response: ' + info);
  }
});

/*

let sendMail = (mailOptions)=>{
    nodemailerMailgun.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
    });
  };
  
  module.exports = sendMail;
  */