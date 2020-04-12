const path = require('path')
const express = require('express')
const hbs = require('hbs')
//require weather related code
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//initializes express
const app = express()
//Define paths for express configuration
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handle bars engines and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Yoram Aharony'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Yoram Aharony'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        name: 'Yoram Aharony',
        helpText: 'This is the help text it can go forever ....'
    })
})


app.get('/weather', (req, res) => {

    if (!req.query.address){
        return res.send({
            error: 'You must provide an address for this page to work!'
        })
    }

    geocode(req.query.address, (error, {longitude, latitude, location}={})=>{
        if (error){
            return res.send({error})            
        }

        // if (error){
        //     return res.send({
        //         error: 'Can not find location'
        //     })
        // }
        
        forecast(longitude, latitude, (error, forecastData) => {
            if (error){
                return res.send({ error})   
            }

            res.send({
                address: req.query.address,
                forecast: forecastData.temperature,
                location
            })              
        })
    })
})


app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: 'Help 404',
        name: 'Yoram Aharony',
        error404: 'Help article was not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Yoram Aharony',
        error404: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})