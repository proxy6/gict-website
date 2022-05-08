const express = require('express')
const ejs = require('ejs');
const path = require('path')
const app = express();
require('dotenv').config()
const contact = require('./router/contact.routes')
const service = require('./router/services.routes')
const portfolio = require('./router/project.routes')
const event = require('./router/event.routes')
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//set up static view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

//set up index route
app.get('/', (req, res)=>{
    res.render('index')
})
//services route
app.use('/contact', contact)
app.use('/services', service)
app.use('/portfolio', portfolio)
app.use('/event', event)


//not found error route
app.get('*', (req, res)=>{
    res.render('not-found')
})
const port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log('server started on port ' + port)
})