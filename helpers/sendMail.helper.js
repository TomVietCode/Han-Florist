var nodemailer = require('nodemailer');

module.exports.sendEmail = (email, subject, html) => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SEND_MAIL_EMAIL,
      pass: process.env.SEND_MAIL_PASSWORD
    }
  });
  
  var mailOptions = {
    from: process.env.SEND_MAIL_EMAIL,
    to: email,
    subject: subject,
    html: html
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
