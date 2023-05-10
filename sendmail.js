const nodemailer = require("nodemailer");
require('dotenv').config();

module.exports = function sendToGmail(message){
    const {google} = require('googleapis');
    const OAuth2 = google.auth.OAuth2;
    
    const OAuth2Client = new OAuth2(process.env.CLIENT_ID,process.env.CLIENT_SECRET);
    
    OAuth2Client.setCredentials({
        refresh_token : process.env.GMAIL_REFRESH_TOKEN,
    });
    
    
    const ACCESS_TOKEN = OAuth2Client.getAccessToken();
    
      const transport = nodemailer.createTransport({
        service : "gmail",
        auth : {
          type : "OAuth2",
          user : process.env.GMAIL_USER,
          clientId : process.env.CLIENT_ID,
          clientSecret : process.env.CLIENT_SECRET,
          refreshToken : process.env.GMAIL_REFRESH_TOKEN,
          accessToken : ACCESS_TOKEN,
        }
      });
    
      var mailOptions = {
        from: message.from,
        to: 'makane.zak@gmail.com',
        subject: message.object,
        html: `<h4>${message.fName} ${message.lName}</h4> <h4>${message.phone}</h4> <p>${message.message}</p>`,
        // generateTextFromHTML: true,
      };
      
    transport.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    
};




