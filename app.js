// Required packages
const path = require('path');
const express = require('express')
const cheerio = require('cheerio')
const request = require('request-promise')
const cors = require('cors')

// Express 
const app = express()
const port = 3000
app.use(cors())

// Working w database ------------------------------------------------
let db = require('./db.js')
let connection = db.my_connection

// Routing ---------------------------------------------------
// End Points
app.listen(port, () => {
    console.log(`Meta Stonks app listening on port ${port}`)
})

app.get('/token_names', (req, res) => {
    res.send(token_names)
})

app.get('/get_users', (req, res) => {
    connection.connect();

    connection.query('SELECT * FROM users', function (error, results, fields) {
    if (error) throw error;
    res.send(results) //enviar resulados
    });

    connection.end();    
})

// Scrapping Stuff ---------------------------------------------------
let $ = cheerio.load("loading...")
let token_names = []
let crypto_names = []

async function init() {
    $ = await request({
        uri: 'https://www.coingecko.com/',
        transform: body => cheerio.load(body)
    })

    const tokens = $('.tw-hidden.d-lg-inline.font-normal.text-3xs.ml-2').each((i, element)=>{
        token_names.push($(element).text().trim())
    })
    const names = $('.tw-hidden.font-bold.tw-items-center.tw-justify-between').each((i, element)=>{
        crypto_names.push($(element).text().trim())
    })
}

init()
