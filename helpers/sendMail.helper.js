var nodemailer = require('nodemailer');

module.exports.sendEmail = (email, subject, html) => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "tiloi2k4@gmail.com",
      pass: "heyqhuxghigmcwcz"
    }
  });
  
  var mailOptions = {
    from: "tiloi2k4@gmail.com",
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
