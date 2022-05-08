module.exports={
    verifyCaptcha: (data, callBack)=>{
        // g-recaptcha-response is the key that browser will generate upon form submit.
        // if its blank or null means user has not selected the captcha, so return the error.
        if(data['g-recaptcha-response'] === undefined || data['g-recaptcha-response'] === '' || data['g-recaptcha-response'] === null) 
        {
             return callBack(`"responseCode" : 1,"responseDesc" : "Please select captcha"`);
        }
        // Put your secret key here.
        var secretKey = process.env.RCAPTCHA;
        // req.connection.remoteAddress will provide IP address of connected user.
        var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + data['g-recaptcha-response'] + "&remoteip=" + data.ip;
        // Hitting GET request to the URL, Google will respond with success or error scenario.
        request(verificationUrl,function(error,response,body) {
        body = JSON.parse(body);
        // Success will be true or false depending upon captcha validation.
         if(body.success !== undefined && !body.success) 
            {
                return callBack(`$responseCode" : 1,"responseDesc" : "Failed captcha verification"`);
            }
            callBack(`"responseCode" : 0,"responseDesc" : "Sucess"`);
     });
}
}