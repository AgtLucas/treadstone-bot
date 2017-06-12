const Twit = require('twit')
const quotes = require('./quotes')

let config

try {
  config = require('./.env')
  console.log(config)
} catch (ex) {
  config = {}
}

const T = new Twit({
  consumer_key: process.env.TW_CONSUMER_API_KEY || config.TW_CONSUMER_API_KEY,
  consumer_secret: process.env.TW_CONSUMER_API_SECRET || config.TW_CONSUMER_API_SECRET,
  access_token: process.env.TW_ACCESS_TOKEN || config.TW_ACCESS_TOKEN,
  access_token_secret: process.env.TW_ACCESS_TOKEN_SECRET || config.TW_ACCESS_TOKEN_SECRET
})

const stream = T.stream('user')

stream.on('follow', event => {
  let source = event.source
  let screenName = source.screen_name

  let welcome = quotes[10]

  T.post('statuses/update', {
    status: `@${screenName}; ${welcome}`
  }, (err, data, response) => {
    console.log(err)
  })
})
