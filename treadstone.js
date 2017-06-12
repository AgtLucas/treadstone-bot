const Twit = require('twit')

let config

try {
  config = require('./.env')
} catch (ex) {
  config = {}
}

const T = new Twit({

})

const stream = T.stream('user')
