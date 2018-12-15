const nodemailer = require('nodemailer')
module.exports = (to, subject, text, html) =>{
   //reusable transport
  const smtpTransport = nodemailer.createTransport("SMTP",{
     service: "Gmail",
     auth: {
         user: process.env.GMAIL_ADDRESS,
         pass: process.env.GMAIL_PASSWORD
     }
  })
  //set up email data
  const mailOptions = {
     from: "Cre8rz <"+ process.env.GMAIL_ADDRESS +">", // sender address
     to, // receiver
     subject, // Subject line
     text, // plaintext body
     html // html body
  }
  // send mail with defined transport object
  smtpTransport.sendMail(mailOptions)
   .then ((error, response) => error ? console.log(error): console.log("Message sent: " + response.message))
   // shut down the connection pool, no more messages
   .then(smtpTransport.close()) 
}