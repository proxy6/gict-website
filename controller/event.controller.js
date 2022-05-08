const nodemailer = require('nodemailer')
const { v4: uuidv4 } = require('uuid');
exports.getEventPage = (req, res)=>{
    res.render('event')
    }

exports.postEventReferral = async (req, res)=>{
   let uuid_code = uuidv4();
    const referal_code = uuid_code.slice(0, 4)
    const referal_tag = `GICT/Clinic-2.0/${referal_code}`
    console.log(referal_tag)
    //users message
    const user_output = `
    <h3>Welcome, We are glad to have you join us in the GICT Crypto Training Referral Program</h3>
    <p> Your Referral tag is <h3> ${referal_tag} </h3> and </p>
    <p> Your Referral code is <h3> ${referal_code} </h3> </p>
    Refer friends to join in on the training class and ask them to use your referal code when making payment
    `
    //gict message
    const output = `
    <p>Someone have Joined GICT Referral Program</p>
    <h3>Contact Details</h3>
    <ul>
    <li>Name: ${req.body.fName}</li>
    <li>Email: ${req.body.email}</li>
    <li>Service: ${req.body.number}</li>
    <li>Referal Code: ${referal_code}</li>
    <li>Date: ${new Date()}</li>
    </ul>
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
            console.log('serveris ready to receive message ' + success)
        })
        
        let info = await transporter.sendMail({
            from: '"GICT", <mail@gictworld.com>',
            to: 'gictacademy@gmail.com',
            subject: "GICT Referall Program",
            html: output // html body
        },
            function(err, info){
                if(err){
                    res.json(err)
                }
                console.log('message sent: %s', info.messageId)       
        })
     
        //send to userss mail
        let user_email = req.body.email;
        let user_mail = await transporter.sendMail({
            from: '"GICT", <mail@gictworld.com>',
            to: `${user_email}`,
            subject: "Welcome to GICT Referral Program",
            html: user_output // html body
        },
            function(err, info){
                if(err){
                    res.json(err)
                }
                console.log('message sent: %s', info.messageId)
               res.render('message',{
                   message: 'Email Sent',
                   details: 'Please check your email inbox or spam folder for your referal code'
               })
    
           
        })

    }