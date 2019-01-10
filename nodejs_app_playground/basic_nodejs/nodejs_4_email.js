'use strict'

// The Nodemailer Module
const nodemailer = require('nodemailer')

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '1794319511@qq.com',
        pass: 'XXX'
    }
})

var mailOptions = {
    from: 'wenming.w.zhou@pwc.com',
    to: 'wenming.w.zhou@cnsdc01.pwc.com',
    //to: 'wenming.w.zhou@cnsdc.pwc.com, anybody@gmail.com',
    subject: 'Sending Email using Node.js!',
    html: '<h1>Welcome!</h1><p>That was <i>EASY</i><b>!</b></p>'
    //text: 'Welcome!That was EASY!'
}

transporter.sendMail(mailOptions, (error, info) => {
    if(error) {
        console.log(error)
    } else {
        console.log('Email sent: ' + info.response)
    }
})


// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: account.user, // generated ethereal user
            pass: account.pass // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: 'bar@example.com, baz@example.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
});