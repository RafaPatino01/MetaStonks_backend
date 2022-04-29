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

// Sentiment Analysis
const natural = require('natural')
const aposToLexForm = require('apos-to-lex-form')
const SpellCorrector = require('spelling-corrector')
const spellCorrector = new SpellCorrector()
spellCorrector.loadDictionary()
const SW = require('stopword')

function getSentiment(pString){
    let string = aposToLexForm(pString).toLowerCase().replace(/[^a-zA-Z\s]+/g, '')
    
    const { WordTokenizer } = natural
    const tokenizer = new WordTokenizer()
    const tokenizedReview = tokenizer.tokenize(string)

    tokenizedReview.forEach((word, index) => {
        tokenizedReview[index] = spellCorrector.correct(word)
    })

    const filteredReview = SW.removeStopwords(tokenizedReview)

    const { SentimentAnalyzer, PorterStemmer } = natural
    const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn')
    const analysis = analyzer.getSentiment(filteredReview)

    return analysis
}

//Token scores
function calculateAverage(array) {
    var total = 0;
    var count = 0;

    array.forEach(function(item, index) {
        total += item;
        count++;
    });

    return total / count;
}

app.get('/crypto_data', (req, res) => {
    let query = `SELECT * FROM development.token_data ORDER BY metascore DESC`;
    connection.query(query, function (error, results, fields) {
    if (error) throw error;
    console.log("token_data selected!")
    res.send(results)
    })
})

app.get('/calcular_metascore', (req, res) => {

    //Clear token data table
    let query = `DELETE FROM development.token_data`;
    connection.query(query, function (error, results, fields) {
    if (error) throw error;
    console.log("token_data cleared!")
    })

    //FILL TABLE AGAIN
    for(let i = 0; i<100; i++){
        
        // Tokens with comonn ocurrences in post text are not necesarily talking about the token
        let notbanned = token_names[i] != "MKR" && token_names[i] != "HT" && token_names[i] != "AR" && token_names[i] != "ONE" && token_names[i] != "BIT"
        
        if(notbanned)
        {
            let query = `select * from crypto_data WHERE title LIKE '%${token_names[i]}%' OR title LIKE '%${crypto_names[i]}%'`;
    
            connection.query(query, function (error, results, fields) {
            if (error) throw error;
                
                if(results.length > 0){
                    let name = token_names[i]
                    let ocurrences = results.length
                    let upvote_ratio = [] //mean
                    let score = [] // mean
                    let sentiment = [] // sum
                    let award = [] // mean

                    results.forEach(post => {
                        upvote_ratio.push(post["upvote_ratio"])
                        score.push(post["score"])
                        sentiment.push(getSentiment(post["title"]))
                        award.push(post["award"])
                    });

                    let ratio_avr = calculateAverage(upvote_ratio)
                    let score_avr = calculateAverage(score)
                    let sentiment_avr = calculateAverage(sentiment)
                    let award_avr = calculateAverage(award)
                    let real_ocurrences = ocurrences

                    // 30 ocurrences threshold
                    // 1000 score threshold

                    // ocurrencias 50%
                    // upvotes_ratio 15%
                    // score 10%
                    // sentiment 15%
                    // award 10%

                    if(ocurrences>30){
                        ocurrences = 30
                    }
                    if(score_avr>1000){
                        score_avr = 1000
                    }

                    let metascore = (ocurrences/30)*60 + ratio_avr*10 + (score_avr/1000)*10 + sentiment_avr*10 + award_avr*10
                    console.log(name + ": metascore = [" + metascore + "]")
                
                    let query = `
                    INSERT INTO development.token_data (token, upvote_ratio, score, title_sentiment, text_sentiment, award, metascore, ocurrences)
                    VALUES ("${name}", ${ratio_avr}, ${score_avr}, ${sentiment_avr}, 0, ${award_avr}, ${metascore}, ${real_ocurrences});`;
                
                    connection.query(query, function (error, results, fields) {
                    if (error) throw error;
                    console.log("Inserted "+ name +" data!")
                    })
                }
            })
        }
        
    }

    res.send(["Updating metascore..."])
})

//NFT Rarity algorithm
app.get('/rarity/:address', (req, res) => {
    let nftid = 0;
    let general_count = 0;
    let traits = [];
    let count_traits = [];
    let rarity = 0;
    let nft_collection = [];
    let url = ""
    const query_nftid = `
    SELECT id FROM nfts WHERE token_address='${req.params["address"]}'`;
    connection.query(query_nftid,function(error,results,fields){
        if(error) throw error;
        nftid = results[0]["id"];
        console.log(nftid)
        connection.query("SELECT count(a) FROM traits",function(error,results,fields){
            if (error) throw error;
            general_count=results[0]["count(a)"];
            console.log(general_count);
            connection.query(`SELECT a FROM traits WHERE traits.id = "${nftid}"`,function(error,results,fields){
                if (error) throw error;
                traits.push(results[0]["a"]);
                console.log("traits: " + traits);
                connection.query(`SELECT a, count(a) as count_a from traits WHERE traits.a = "${traits[0]}"  group by a`,function(error,results,fields){
                    count_traits.push(results[0]["count_a"]);
                    console.log(count_traits);
                    rarity = count_traits[0] / general_count;
                    console.log(rarity);
                    connection.query(`SELECT img_url FROM nfts WHERE nfts.id = "${nftid}"`, function(error,results,fields){
                        if (error) throw error;
                        url = results[0]["img_url"]
                        res.status(200).send([rarity, url]);
                    });
                    
                });
            });
        });
    });
    
})
