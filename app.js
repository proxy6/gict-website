const express = require('express')
const ejs = require('ejs');
const path = require('path')
const app = express();

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
const port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log('server started on port ' + port)
})