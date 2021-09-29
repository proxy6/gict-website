const nodemailer = require('nodemailer')
const express = require('express')
const app = express();

exports.crypto= async (req, res) => {
const output = `
<p>I want to buy cyptocurrency</p>
<h3>Crypto Sell</h3>
<ul>
<li>Name: ${req.body.fullName}</li>
<li>Email: ${req.body.email}</li>
<li>Phone: ${req.body.phone}</li>
<li>Date: ${new Date()}</li>
</ul>
<h3>Message:</h3>
<p>I want to buy ${req.body.quantity} quantity of ${req.body.crypto}</p>
`

console.log(output)
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
    
    let info = await transporter.sendMail({
        from: '"GICT Website", <mail@gictworld.com>',
        to: 'gictacademy@gmail.com',
        subject: "Contact Info",
        html: output // html body
    },
        function(err, info){
            if(err){
                res.json(err)
            }
            console.log('message sent: %s', info.messageId)
           res.render('message',{
               message: 'Email Sent'
           })

       
    })
 


}
