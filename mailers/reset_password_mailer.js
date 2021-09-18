const nodeMailer = require('../config/nodemailer');

exports.resetPassword = (email,accessToken) => {

    console.log('inside reset password mailer');
    console.log('*************',email,accessToken);
    let htmlString = nodeMailer.renderTemplate({accessToken : accessToken},'/reset-password/reset_password.ejs');
    nodeMailer.transporter.sendMail({
        from : 'mohammed.neog@gmail.com',
        to : email,
        subject : 'Reset Your Password',
        html : htmlString
    },
    // callback
    (err,info) => {
        if(err){
            console.log('error in sending reset password mail ********',err);
            return;
        }

        console.log('mail delivered',info);
        return;
    }
    );
}

