const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');
const Promise = require('bluebird');
const settings = require('../emailSettings.json');
const nodemailerMailgun = nodemailer.createTransport(mg(settings));

const sendMailAsync = Promise.promisify(nodemailerMailgun.sendMail.bind(nodemailerMailgun));

module.exports = {

  sendEmail: (subject, htmlBase) => {

    const to = settings.recipient;
    const from = replyTo = settings.sender;
    const html = '<p>' + settings.header + '</p>' +
      htmlBase + '<p>' + settings.footer + '</p>' +
        '<p>' + settings.senderName + '</p>';

    let mailOptions = { from, to, replyTo, subject, html };
    // send mail with defined transport object
    return sendMailAsync(mailOptions);

  }
};
