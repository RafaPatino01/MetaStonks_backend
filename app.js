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
    connection.query('SELECT * FROM users', function (error, results, fields) {
    if (error) throw error;
    res.send(results) //enviar resulados
    })
})

let logged_users = []
//REGISTRO
app.get('/register/:mail/:username/:pass', (req, res) => {
    req.params

    let query = `
    INSERT INTO development.users (username, password, email)
    VALUES ("${req.params["username"]}", "${req.params["pass"]}", "${req.params["mail"]}");`;

    connection.query(query, function (error, results, fields) {
    if (error) throw error;
    console.log("User was registered...")
    })

})
//LOGIN
app.get('/login/:username/:pass', (req, res) => {
    req.params

    let query = `
    SELECT * FROM development.users WHERE username='${req.params["username"]}'`;

    connection.query(query, function (error, results, fields) {
        if (error) {
            console.log(error)   
        }

        if(results[0]["password"] == req.params["pass"]){
            res.send(["OK"])
            logged_users.push(req.params["username"])
        }
        else {
            res.send(["Wrong password"])
        }
    })
})
// is logged ?
app.get('/is_logged/:user', (req, res) => {
    if(logged_users.includes(req.params["user"])){
        res.send(["OK"])
    }
    else {
        res.send(["NOT LOGGED"])
    }
})
// log out
app.get('/log_out/:user', (req, res) => {
    if(logged_users.includes(req.params["user"])){
        const index = logged_users.indexOf(req.params["user"]);
        if (index > -1) {
            logged_users.splice(index, 1);
        }
        res.send(["OK"])
    }
    else {
        res.send(["Error"])
    }
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

//REDDIT API------------------------------------------------
let reddit = require('./reddit.js')
let r = reddit.my_reddit

app.get('/update_crypto', (req, res) => {

    connection.query("DELETE FROM development.crypto_data", function (error, results, fields) {
    if (error) throw error;
    })

    // ------ hot
    r.getSubreddit('CryptoCurrency').getHot().then(subreddit => {
        for(let i=0; i<subreddit.length; i++)
        {
            
            let award = 0
    
            if(subreddit[i]["all_awardings"].length > 0){
                award = 1
            }
    
            let title = subreddit[i]["title"].replace(/[^a-zA-Z ]/g, "")
            let upvote_ratio = subreddit[i]["upvote_ratio"]
            let score = subreddit[i]["score"]
            let text = ""
            if(subreddit[i]["selftext_html"] != null){
                text = subreddit[i]["selftext_html"].replace(/[^a-zA-Z ]/g, "")
            }
            
            let query = `
            INSERT INTO development.crypto_data (title, upvote_ratio, score, text, award)
            VALUES ('${title}', ${upvote_ratio}, ${score}, '${text}', ${award});`;

            connection.query(query, function (error, results, fields) {
            if (error) throw error;
                console.log("inserted" + i)
            })
        }
    })
    r.getSubreddit('Crypto_com').getHot().then(subreddit => {
        for(let i=0; i<subreddit.length; i++)
        {
            
            let award = 0
    
            if(subreddit[i]["all_awardings"].length > 0){
                award = 1
            }
    
            let title = subreddit[i]["title"].replace(/[^a-zA-Z ]/g, "")
            let upvote_ratio = subreddit[i]["upvote_ratio"]
            let score = subreddit[i]["score"]
            let text = ""
            if(subreddit[i]["selftext_html"] != null){
                text = subreddit[i]["selftext_html"].replace(/[^a-zA-Z ]/g, "")
            }
            
            let query = `
            INSERT INTO development.crypto_data (title, upvote_ratio, score, text, award)
            VALUES ('${title}', ${upvote_ratio}, ${score}, '${text}', ${award});`;

            connection.query(query, function (error, results, fields) {
            if (error) throw error;
                console.log("inserted" + i)
            })
        }
    })
    r.getSubreddit('cryptocurrencymemes').getHot().then(subreddit => {
        for(let i=0; i<subreddit.length; i++)
        {
            
            let award = 0
    
            if(subreddit[i]["all_awardings"].length > 0){
                award = 1
            }
    
            let title = subreddit[i]["title"].replace(/[^a-zA-Z ]/g, "")
            let upvote_ratio = subreddit[i]["upvote_ratio"]
            let score = subreddit[i]["score"]
            let text = ""
            if(subreddit[i]["selftext_html"] != null){
                text = subreddit[i]["selftext_html"].replace(/[^a-zA-Z ]/g, "")
            }
            
            let query = `
            INSERT INTO development.crypto_data (title, upvote_ratio, score, text, award)
            VALUES ('${title}', ${upvote_ratio}, ${score}, '${text}', ${award});`;

            connection.query(query, function (error, results, fields) {
            if (error) throw error;
                console.log("inserted" + i)
            })
        }
    })
    r.getSubreddit('SatoshiStreetBets').getHot().then(subreddit => {
        for(let i=0; i<subreddit.length; i++)
        {
            
            let award = 0
    
            if(subreddit[i]["all_awardings"].length > 0){
                award = 1
            }
    
            let title = subreddit[i]["title"].replace(/[^a-zA-Z ]/g, "")
            let upvote_ratio = subreddit[i]["upvote_ratio"]
            let score = subreddit[i]["score"]
            let text = ""
            if(subreddit[i]["selftext_html"] != null){
                text = subreddit[i]["selftext_html"].replace(/[^a-zA-Z ]/g, "")
            }
            
            let query = `
            INSERT INTO development.crypto_data (title, upvote_ratio, score, text, award)
            VALUES ('${title}', ${upvote_ratio}, ${score}, '${text}', ${award});`;

            connection.query(query, function (error, results, fields) {
            if (error) throw error;
                console.log("inserted" + i)
            })
        }
    })
    r.getSubreddit('CryptoMarkets').getHot().then(subreddit => {
        for(let i=0; i<subreddit.length; i++)
        {
            
            let award = 0
    
            if(subreddit[i]["all_awardings"].length > 0){
                award = 1
            }
    
            let title = subreddit[i]["title"].replace(/[^a-zA-Z ]/g, "")
            let upvote_ratio = subreddit[i]["upvote_ratio"]
            let score = subreddit[i]["score"]
            let text = ""
            if(subreddit[i]["selftext_html"] != null){
                text = subreddit[i]["selftext_html"].replace(/[^a-zA-Z ]/g, "")
            }
            
            let query = `
            INSERT INTO development.crypto_data (title, upvote_ratio, score, text, award)
            VALUES ('${title}', ${upvote_ratio}, ${score}, '${text}', ${award});`;

            connection.query(query, function (error, results, fields) {
            if (error) throw error;
                console.log("inserted" + i)
            })
        }
    })

    // ------ rising

    r.getSubreddit('CryptoCurrency').getRising().then(subreddit => {
        for(let i=0; i<subreddit.length; i++)
        {
            
            let award = 0
    
            if(subreddit[i]["all_awardings"].length > 0){
                award = 1
            }
    
            let title = subreddit[i]["title"].replace(/[^a-zA-Z ]/g, "")
            let upvote_ratio = subreddit[i]["upvote_ratio"]
            let score = subreddit[i]["score"]
            let text = ""
            if(subreddit[i]["selftext_html"] != null){
                text = subreddit[i]["selftext_html"].replace(/[^a-zA-Z ]/g, "")
            }
            
            let query = `
            INSERT INTO development.crypto_data (title, upvote_ratio, score, text, award)
            VALUES ('${title}', ${upvote_ratio}, ${score}, '${text}', ${award});`;

            connection.query(query, function (error, results, fields) {
            if (error) throw error;
                console.log("inserted" + i)
            })
        }
    })
    r.getSubreddit('Crypto_com').getRising().then(subreddit => {
        for(let i=0; i<subreddit.length; i++)
        {
            
            let award = 0
    
            if(subreddit[i]["all_awardings"].length > 0){
                award = 1
            }
    
            let title = subreddit[i]["title"].replace(/[^a-zA-Z ]/g, "")
            let upvote_ratio = subreddit[i]["upvote_ratio"]
            let score = subreddit[i]["score"]
            let text = ""
            if(subreddit[i]["selftext_html"] != null){
                text = subreddit[i]["selftext_html"].replace(/[^a-zA-Z ]/g, "")
            }
            
            let query = `
            INSERT INTO development.crypto_data (title, upvote_ratio, score, text, award)
            VALUES ('${title}', ${upvote_ratio}, ${score}, '${text}', ${award});`;

            connection.query(query, function (error, results, fields) {
            if (error) throw error;
                console.log("inserted" + i)
            })
        }
    })
    r.getSubreddit('cryptocurrencymemes').getRising().then(subreddit => {
        for(let i=0; i<subreddit.length; i++)
        {
            
            let award = 0
    
            if(subreddit[i]["all_awardings"].length > 0){
                award = 1
            }
    
            let title = subreddit[i]["title"].replace(/[^a-zA-Z ]/g, "")
            let upvote_ratio = subreddit[i]["upvote_ratio"]
            let score = subreddit[i]["score"]
            let text = ""
            if(subreddit[i]["selftext_html"] != null){
                text = subreddit[i]["selftext_html"].replace(/[^a-zA-Z ]/g, "")
            }
            
            let query = `
            INSERT INTO development.crypto_data (title, upvote_ratio, score, text, award)
            VALUES ('${title}', ${upvote_ratio}, ${score}, '${text}', ${award});`;

            connection.query(query, function (error, results, fields) {
            if (error) throw error;
                console.log("inserted" + i)
            })
        }
    })
    r.getSubreddit('SatoshiStreetBets').getRising().then(subreddit => {
        for(let i=0; i<subreddit.length; i++)
        {
            
            let award = 0
    
            if(subreddit[i]["all_awardings"].length > 0){
                award = 1
            }
    
            let title = subreddit[i]["title"].replace(/[^a-zA-Z ]/g, "")
            let upvote_ratio = subreddit[i]["upvote_ratio"]
            let score = subreddit[i]["score"]
            let text = ""
            if(subreddit[i]["selftext_html"] != null){
                text = subreddit[i]["selftext_html"].replace(/[^a-zA-Z ]/g, "")
            }
            
            let query = `
            INSERT INTO development.crypto_data (title, upvote_ratio, score, text, award)
            VALUES ('${title}', ${upvote_ratio}, ${score}, '${text}', ${award});`;

            connection.query(query, function (error, results, fields) {
            if (error) throw error;
                console.log("inserted" + i)
            })
        }
    })
    r.getSubreddit('CryptoMarkets').getRising().then(subreddit => {
        for(let i=0; i<subreddit.length; i++)
        {
            
            let award = 0
    
            if(subreddit[i]["all_awardings"].length > 0){
                award = 1
            }
    
            let title = subreddit[i]["title"].replace(/[^a-zA-Z ]/g, "")
            let upvote_ratio = subreddit[i]["upvote_ratio"]
            let score = subreddit[i]["score"]
            let text = ""
            if(subreddit[i]["selftext_html"] != null){
                text = subreddit[i]["selftext_html"].replace(/[^a-zA-Z ]/g, "")
            }
            
            let query = `
            INSERT INTO development.crypto_data (title, upvote_ratio, score, text, award)
            VALUES ('${title}', ${upvote_ratio}, ${score}, '${text}', ${award});`;

            connection.query(query, function (error, results, fields) {
            if (error) throw error;
                console.log("inserted" + i)
            })
        }
    })
    

    // -------- TOP


    r.getSubreddit('CryptoCurrency').getTop({time: 'all'}).then(subreddit => {
        for(let i=0; i<subreddit.length; i++)
        {
            
            let award = 0
    
            if(subreddit[i]["all_awardings"].length > 0){
                award = 1
            }
    
            let title = subreddit[i]["title"].replace(/[^a-zA-Z ]/g, "")
            let upvote_ratio = subreddit[i]["upvote_ratio"]
            let score = subreddit[i]["score"]
            let text = ""
            if(subreddit[i]["selftext_html"] != null){
                text = subreddit[i]["selftext_html"].replace(/[^a-zA-Z ]/g, "")
            }
            
            let query = `
            INSERT INTO development.crypto_data (title, upvote_ratio, score, text, award)
            VALUES ('${title}', ${upvote_ratio}, ${score}, '${text}', ${award});`;

            connection.query(query, function (error, results, fields) {
            if (error) throw error;
                console.log("inserted" + i)
            })
        }
    })
    r.getSubreddit('Crypto_com').getTop({time: 'all'}).then(subreddit => {
        for(let i=0; i<subreddit.length; i++)
        {
            
            let award = 0
    
            if(subreddit[i]["all_awardings"].length > 0){
                award = 1
            }
    
            let title = subreddit[i]["title"].replace(/[^a-zA-Z ]/g, "")
            let upvote_ratio = subreddit[i]["upvote_ratio"]
            let score = subreddit[i]["score"]
            let text = ""
            if(subreddit[i]["selftext_html"] != null){
                text = subreddit[i]["selftext_html"].replace(/[^a-zA-Z ]/g, "")
            }
            
            let query = `
            INSERT INTO development.crypto_data (title, upvote_ratio, score, text, award)
            VALUES ('${title}', ${upvote_ratio}, ${score}, '${text}', ${award});`;

            connection.query(query, function (error, results, fields) {
            if (error) throw error;
                console.log("inserted" + i)
            })
        }
    })
    r.getSubreddit('cryptocurrencymemes').getTop({time: 'all'}).then(subreddit => {
        for(let i=0; i<subreddit.length; i++)
        {
            
            let award = 0
    
            if(subreddit[i]["all_awardings"].length > 0){
                award = 1
            }
    
            let title = subreddit[i]["title"].replace(/[^a-zA-Z ]/g, "")
            let upvote_ratio = subreddit[i]["upvote_ratio"]
            let score = subreddit[i]["score"]
            let text = ""
            if(subreddit[i]["selftext_html"] != null){
                text = subreddit[i]["selftext_html"].replace(/[^a-zA-Z ]/g, "")
            }
            
            let query = `
            INSERT INTO development.crypto_data (title, upvote_ratio, score, text, award)
            VALUES ('${title}', ${upvote_ratio}, ${score}, '${text}', ${award});`;

            connection.query(query, function (error, results, fields) {
            if (error) throw error;
                console.log("inserted" + i)
            })
        }
    })
    r.getSubreddit('SatoshiStreetBets').getTop({time: 'all'}).then(subreddit => {
        for(let i=0; i<subreddit.length; i++)
        {
            
            let award = 0
    
            if(subreddit[i]["all_awardings"].length > 0){
                award = 1
            }
    
            let title = subreddit[i]["title"].replace(/[^a-zA-Z ]/g, "")
            let upvote_ratio = subreddit[i]["upvote_ratio"]
            let score = subreddit[i]["score"]
            let text = ""
            if(subreddit[i]["selftext_html"] != null){
                text = subreddit[i]["selftext_html"].replace(/[^a-zA-Z ]/g, "")
            }
            
            let query = `
            INSERT INTO development.crypto_data (title, upvote_ratio, score, text, award)
            VALUES ('${title}', ${upvote_ratio}, ${score}, '${text}', ${award});`;

            connection.query(query, function (error, results, fields) {
            if (error) throw error;
                console.log("inserted" + i)
            })
        }
    })
    r.getSubreddit('CryptoMarkets').getTop({time: 'all'}).then(subreddit => {
        for(let i=0; i<subreddit.length; i++)
        {
            
            let award = 0
    
            if(subreddit[i]["all_awardings"].length > 0){
                award = 1
            }
    
            let title = subreddit[i]["title"].replace(/[^a-zA-Z ]/g, "")
            let upvote_ratio = subreddit[i]["upvote_ratio"]
            let score = subreddit[i]["score"]
            let text = ""
            if(subreddit[i]["selftext_html"] != null){
                text = subreddit[i]["selftext_html"].replace(/[^a-zA-Z ]/g, "")
            }
            
            let query = `
            INSERT INTO development.crypto_data (title, upvote_ratio, score, text, award)
            VALUES ('${title}', ${upvote_ratio}, ${score}, '${text}', ${award});`;

            connection.query(query, function (error, results, fields) {
            if (error) throw error;
                console.log("inserted" + i)
            })
        }
    })

    // --------- Controversial


    r.getSubreddit('CryptoCurrency').getControversial({time: 'week'}).then(subreddit => {
        for(let i=0; i<subreddit.length; i++)
        {
            
            let award = 0
    
            if(subreddit[i]["all_awardings"].length > 0){
                award = 1
            }
    
            let title = subreddit[i]["title"].replace(/[^a-zA-Z ]/g, "")
            let upvote_ratio = subreddit[i]["upvote_ratio"]
            let score = subreddit[i]["score"]
            let text = ""
            if(subreddit[i]["selftext_html"] != null){
                text = subreddit[i]["selftext_html"].replace(/[^a-zA-Z ]/g, "")
            }
            
            let query = `
            INSERT INTO development.crypto_data (title, upvote_ratio, score, text, award)
            VALUES ('${title}', ${upvote_ratio}, ${score}, '${text}', ${award});`;

            connection.query(query, function (error, results, fields) {
            if (error) throw error;
                console.log("inserted" + i)
            })
        }
    })
    r.getSubreddit('Crypto_com').getControversial({time: 'week'}).then(subreddit => {
        for(let i=0; i<subreddit.length; i++)
        {
            
            let award = 0
    
            if(subreddit[i]["all_awardings"].length > 0){
                award = 1
            }
    
            let title = subreddit[i]["title"].replace(/[^a-zA-Z ]/g, "")
            let upvote_ratio = subreddit[i]["upvote_ratio"]
            let score = subreddit[i]["score"]
            let text = ""
            if(subreddit[i]["selftext_html"] != null){
                text = subreddit[i]["selftext_html"].replace(/[^a-zA-Z ]/g, "")
            }
            
            let query = `
            INSERT INTO development.crypto_data (title, upvote_ratio, score, text, award)
            VALUES ('${title}', ${upvote_ratio}, ${score}, '${text}', ${award});`;

            connection.query(query, function (error, results, fields) {
            if (error) throw error;
                console.log("inserted" + i)
            })
        }
    })
    r.getSubreddit('cryptocurrencymemes').getControversial({time: 'week'}).then(subreddit => {
        for(let i=0; i<subreddit.length; i++)
        {
            
            let award = 0
    
            if(subreddit[i]["all_awardings"].length > 0){
                award = 1
            }
    
            let title = subreddit[i]["title"].replace(/[^a-zA-Z ]/g, "")
            let upvote_ratio = subreddit[i]["upvote_ratio"]
            let score = subreddit[i]["score"]
            let text = ""
            if(subreddit[i]["selftext_html"] != null){
                text = subreddit[i]["selftext_html"].replace(/[^a-zA-Z ]/g, "")
            }
            
            let query = `
            INSERT INTO development.crypto_data (title, upvote_ratio, score, text, award)
            VALUES ('${title}', ${upvote_ratio}, ${score}, '${text}', ${award});`;

            connection.query(query, function (error, results, fields) {
            if (error) throw error;
                console.log("inserted" + i)
            })
        }
    })
    r.getSubreddit('SatoshiStreetBets').getControversial({time: 'week'}).then(subreddit => {
        for(let i=0; i<subreddit.length; i++)
        {
            
            let award = 0
    
            if(subreddit[i]["all_awardings"].length > 0){
                award = 1
            }
    
            let title = subreddit[i]["title"].replace(/[^a-zA-Z ]/g, "")
            let upvote_ratio = subreddit[i]["upvote_ratio"]
            let score = subreddit[i]["score"]
            let text = ""
            if(subreddit[i]["selftext_html"] != null){
                text = subreddit[i]["selftext_html"].replace(/[^a-zA-Z ]/g, "")
            }
            
            let query = `
            INSERT INTO development.crypto_data (title, upvote_ratio, score, text, award)
            VALUES ('${title}', ${upvote_ratio}, ${score}, '${text}', ${award});`;

            connection.query(query, function (error, results, fields) {
            if (error) throw error;
                console.log("inserted" + i)
            })
        }
    })
    r.getSubreddit('CryptoMarkets').getControversial({time: 'week'}).then(subreddit => {
        for(let i=0; i<subreddit.length; i++)
        {
            
            let award = 0
    
            if(subreddit[i]["all_awardings"].length > 0){
                award = 1
            }
    
            let title = subreddit[i]["title"].replace(/[^a-zA-Z ]/g, "")
            let upvote_ratio = subreddit[i]["upvote_ratio"]
            let score = subreddit[i]["score"]
            let text = ""
            if(subreddit[i]["selftext_html"] != null){
                text = subreddit[i]["selftext_html"].replace(/[^a-zA-Z ]/g, "")
            }
            
            let query = `
            INSERT INTO development.crypto_data (title, upvote_ratio, score, text, award)
            VALUES ('${title}', ${upvote_ratio}, ${score}, '${text}', ${award});`;

            connection.query(query, function (error, results, fields) {
            if (error) throw error;
                console.log("inserted" + i)
            })
        }
    })

})