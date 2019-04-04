const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('../util/geocode.js');
const forecast = require('../util/forecast.js')
const app = express();

//define path for express config
const publicDirectoryPath = path.join(__dirname , '../public')
const viewsPath = path.join(__dirname , '../templates/views')
const partialsPath = path.join(__dirname , '../templates/partials')

//set handlebars engine and views location
app.set('view engine' , 'hbs') // set handlebar engine
app.set('views' , viewsPath) //templates directory supposed to be views directory , to coustomise any default directoruy name use app.set()
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('' , (req,res)=>{
    res.render('index' ,{
        title : 'weather' , 
        description : 'Use this site to get your weather'
    })
});

app.get('/about' , (req,res)=>{
    res.render('about' ,{
        title : 'About Page' , 
        description : 'About page description'
    })
});

app.get('/help' , (req,res)=>{
    res.render('help' ,{
        title : 'Help Page' , 
        description : 'help page description'
    })
});

app.get('/help' , (req,res)=>{
    res.send({page : 'help'});
});

app.get('/about' , (req,res)=>{
    res.send('<h1>About</h1>');
});

app.get('/weather' , (req,res)=>{
     if(!req.query.address) {
         res.send('you must provide address')
     } else {
         geocode.getGeocode(req.query.address , (error , data) => {
             if(error) {
                 res.send('weather service is not available')
             } else {
                 forecast.getForecast(data.lattitude , data.longitude , (error , data) => {
                     if(error) {
                         res.send('error found')
                     } else {
                         res.send(data)
                     }
                 });
             };
         });
     };
});

//test query string
app.get('/product' , (req,res)=>{
    if(req.query){
        res.send(req.query)
    } else {
        res.send([])   
    }
});

app.get('*' , (req,res)=>{
    res.render('404' ,{
        title : '404' , 
        name : 'keshav garg',
        errorMessage : 'Page not found'
    })
});




app.listen(3000, () =>{
    console.log('sever is up')
})