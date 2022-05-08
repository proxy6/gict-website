const nodemailer = require('nodemailer')
exports.email= async (req, res) => {

    
    // create an object variable output with details of the message
    let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true,
        auth:{
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    })
    transporter.verify((err, success)=>{
        if(err){
            console.log(err)
        }
        console.log('serveris ready to receive message ' + success)
    })
 module.exports= transporter   
 
}


