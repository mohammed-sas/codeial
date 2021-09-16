const nodeMailer = require('../config/nodemailer');

// this is another way of exporting a method
exports.newComment = (comment) => {
    console.log('inside new comment mailer',comment);

    nodeMailer.transporter.sendMail({
        from : 'mohammed@codeial.com',
        to : comment.user.email,
        subject : 'New comment published',
        body : '<h1> Yup , your comment is now published</h1>'
    },
    // callback
    (err,info) => {
        if(err){
            console.log('error in sending mail ********',err);
            return;
        }

        console.log('mail delivered',info);
        return;
    }
    );
}