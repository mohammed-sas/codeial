const queue = require('../config/kue');
const resetPasswordMailer = require('../mailers/reset_password_mailer');


// creating a queue called emails
queue.process('resetPassword',function(job,done){
    console.log('reset password emails worker is processing a job');
    
    resetPasswordMailer.resetPassword(job.data.resetEmail,job.data.resetToken);

    done();

});