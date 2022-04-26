// Required packages
const express = require('express')
const cheerio = require('cheerio')
const request = require('request-promise')

const app = express()
const port = 3000

// Express Routing

app.get('/', (req, res) => {
    res.send($.html())
})

app.get('/token_names', (req, res) => {
    res.send(token_names)
})

app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})

// Scrapping Stuff
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
    console.log(token_names)
    console.log(crypto_names)

}

init()

// Working w database
let msg = require('./db.js')
console.log(msg.SimpleMessage);
