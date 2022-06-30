const express = require('express')
const path = require('path')
const { title } = require('process')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()

const port = process.env.PORT || 3000

//DEFINE PATHS FOR EXPRESS CONFIG
const PubDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../Templates/views')

const parPath = path.join(__dirname, '../templates/partials')

//SET HANDLEBARS ENGINE AND VIEWS LOCATION
app.set('views', viewsPath)
app.set('view engine', 'hbs')

hbs.registerPartials(parPath)

// SETUP STATIC DIRECTORY TO USE
app.use(express.static(PubDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Get Your Weather!',
        quote: 'Have a good day:)',
        name: 'Anurudh'
    }
    )
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        quote: 'Have a good day:)',
        name: 'Anurudh'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        help: 'Get help, give help :)',
        title: 'Help',
        quote: 'Have a good day:)',
        name: 'Anurudh'
    })
})

app.get('/document', (req, res) => {
    res.render('document', {
        help: 'Get help, give help :)',
        title: 'Documentation',
        quote: 'Have a good day:)',
        name: 'Anurudh'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please enter an address:)'
        })
    }
    var weather
    geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, fdata) => {
            if (error) {
                return res.send({ error })
            }
            console.log(fdata)
            res.send({
                address: req.query.address,
                location,
                fdata
            })
            // console.log('Location : ' , location)
            // console.log(fdata)

        })
    })

    // console.log(req.query.address)
    // res.send(
    //     {
    //         weather,
    //         address: req.query.address
    //     })
})

// app.get('/products', (req, res) => {
//     if (!req.query.search) {
//         return res.send({
//             error: 'Please enter a search term:)'
//         })

//     }
//     console.log(req.query.search)
//     res.send({
//         products: []
//     })
// })

app.get('/help/*', (req, res) => {
    res.render('Help404', {
        title: '404',
        quote: 'Have a good day:)',
        name: 'Anurudh',
        error: 'Help article not found:('
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        quote: 'Have a good day:)',
        name: 'Anurudh',
        error: 'Page not found:('
    })
})

app.listen(port, () => {
    console.log("SERVER UP! on " + port)
})