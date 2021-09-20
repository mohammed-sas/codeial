const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

// this send the emails and defines how comm takes place
let transporter = nodemailer.createTransport({
    service : 'gmail',
    host : 'smtp.gmail.com',
    // tsl port on which smtp works
    port : 587,
    secure : false,
    auth : {
        user : 'mohammed.neog',
        pass : 'stwnziabqkynqbhd'
    }
});

// it defines where the files would be placed and what to render

let renderTemplate = (data,relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){
                console.log(`error in rendering template ${err}`);
                return;
            }
            console.log(template);

            mailHTML = template;
        }
    )
        return mailHTML;


}


module.exports = {
    transporter : transporter,
    renderTemplate : renderTemplate
}