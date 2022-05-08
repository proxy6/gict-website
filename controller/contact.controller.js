const nodemailer = require('nodemailer')
const process = require ('process')
const {verifyCaptcha} = require('../config/verifyCaptcha')
exports.contact= async (req, res) => {
    console.log(req.body)
    const data = req.body
    data.ip = req.connection.remoteAddress
    console.log(data)
    verifyCaptcha(data, async (err, resp)=>{
        if(err) return res.json({data:'an error'})

        
        const output = `
        <p>You have a new contact information</p>
        <h3>Contact Details</h3>
        <ul>
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
        <li>Service: ${req.body.service}</li>
        <li>Date: ${new Date()}</li>
        </ul>
        <h3>Message:</h3>
        <p>${req.body.message}</p>
        `
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
                return console.log('serveris ready to receive message ' + success)
            })
            
            
            let info = await transporter.sendMail({
                from: '"GICT", <mail@gictworld.com>',
                to: 'gictacademy@gmail.com',
                subject: "Contact Info",
                html: output // html body
            },
                function(err, info){
                    if(err){
                        res.json(err)
                    }
                    return res.send('Email Sent')
                //     console.log('message sent: %s', info.messageId)
                //    res.render('message',{
                //        message: 'Email Sent',
                //        details: 'We would get back to you shortly'
                //    })
        
            })
    })    
    }
    