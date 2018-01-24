const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');
const Promise = require('bluebird');
const auth = require('../mailgunAuth.json');

// This is your API key that you retrieve from www.mailgun.com/cp (free up to 10K monthly emails)
const auth = {
  auth
  // auth: {
  //   api_key: 'key-1234123412341234',
  //   domain: 'one of your domain names listed at your https://mailgun.com/app/domains'
  // },
  // proxy: 'http://user:pass@localhost:8080' // optional proxy, default is false
}

const nodemailerMailgun = nodemailer.createTransport(mg(auth));

const sendMailAsync = Promise.promisify(nodemailerMailgun.sendMail.bind(nodemailerMailgun));

module.exports = {

  sendEmail: (to, subject, html) => {

     const from = 'Robot <robot@' + auth.domain + '>';
     const replyTo = 'Robot <robot@' + auth.domain + '>';
     // setup email data with unicode symbols
     let mailOptions = { from, to, replyTo, subject, html };

     // send mail with defined transport object
     return sendMailAsync(mailOptions);

  }
}
