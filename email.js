const nm = require('nodemailer');
const db = require('./db')();

module.exports = () => {

    const emailAdminNotification = async (subject, message) => {
        //creates a new transporte for the email
        let email = nm.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        //sending mails to admins
        try{
            const results = await db.get("users",{usertype:"admin"});                    
            for(r in results){
                email.sendMail({
                    from: process.env.EMAIL,
                    to: results[r].email,
                    subject: subject,
                    text: message
                }, function(err,data){
                    if(err){
                        console.log('Email Notification to Admin ' + results[r].email + ' Failed');
                    }
                });                        
            }  
            console.log('Email Notification to Admins Sent');                  
        } catch (ex) {
            console.log(ex);
        }
    }

    const emailNotification = (address, subject, message) => {        
        //creates a new transporte for the email
        let email = nm.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        //configures the message and recepients of the email
        let config = {
            from: process.env.EMAIL,
            to: address,
            subject: subject,
            text: message
        };
        //sends the email
        email.sendMail(config, async function(err, data){
            if(err){
                console.log('Email Notification Failed');
            } else {
                console.log('Email Notification Sent');
                emailAdminNotification(message,subject);                
            }
        }); 
         
    }

    return {
        emailNotification,
        emailAdminNotification
    }
};   