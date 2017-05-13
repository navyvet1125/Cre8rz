var nodemailer = require('nodemailer');
var mailer = function(userTo, subject, body, htmlBody){
   //reusable transport
  var smtpTransport = nodemailer.createTransport("SMTP",{
     service: "Gmail",
     auth: {
         user: process.env.GMAIL_ADDRESS,
         pass: process.env.GMAIL_PASSWORD
     }
  });
  //set up email data
  var mailOptions = {
     from: "Cre8rz <"+ process.env.GMAIL_ADDRESS +">", // sender address
     to: userTo, // receiver
     subject: subject, // Subject line
     text: body, // plaintext body
     html: htmlBody // html body
  };
  // send mail with defined transport object
  smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
         console.log(error);
     }else{
         console.log("Message sent: " + response.message);
     }
     // if you don't want to use this transport object anymore, uncomment following line
     //smtpTransport.close(); // shut down the connection pool, no more messages
  });
};

module.exports = mailer;