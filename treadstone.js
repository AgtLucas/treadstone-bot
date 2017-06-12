const Twit = require('twit')
const quotes = require('./quotes')

let config

try {
  config = require('./.env')
  console.log(config)
} catch (ex) {
  config = {}
}

const shuffle = arr => arr[Math.floor(Math.random() * arr.length)]

const T = new Twit({
  consumer_key: process.env.tw_consumer_api_key || config.TW_CONSUMER_API_KEY,
  consumer_secret: process.env.tw_consumer_api_secret || config.TW_CONSUMER_API_SECRET,
  access_token: process.env.tw_access_token || config.TW_ACCESS_TOKEN,
  access_token_secret: process.env.tw_access_token_secret || config.TW_ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000
})

const stream = T.stream('user')

stream.on('follow', event => {
  const source = event.source
  const screenName = source.screen_name

  const welcome = quotes[10]

  T.post('statuses/update', {
    status: `@${screenName} ${welcome}`
  }, (err, data, response) => {
    console.log(err)
  })
})

stream.on('tweet', message => {
  const screenName = message.user.screen_name
  const quote = shuffle(quotes)

  console.log(message)

  if (message.in_reply_to_screen_name === 'TreadstoneBot') {
    T.post('statuses/update', {
      status: `@${screenName} ${quote}`
    }, (err, data, response) => {
      console.log(err)
    })
  }
})
