var TelegramBot = require('node-telegram-bot-api');

var token = '237778509:AAGPyNDj1bzGveJ_6l9UqxGAc3G5kxzqyyQ';
var cheerio = require('cheerio'),
    request = require("request"),
    bot = new TelegramBot(token, {polling: true});

var movieapi = "https://api.whatismymovie.com/1.0/?api_key=7q6KqMmV33JZWsdq&text="

bot.on('message', function (msg) {
  var chatId = msg.chat.id;
  if (msg.text == "/start" || msg.text == "/help") {
    bot.sendMessage(chatId, 'Describe any aspect of the movie content you are looking for, and we will find the best movies for you. Search for example:\n<i>find all Harry Potter movies</i>\n<i>find me James Bond movies with Sean Connery</i>\n<i>show me parody films</i>\n<i>scifi movie about space battles and laser guns</i>\n<i>eastwood protecting the president</i>\n<i>romantic scifi movie</i>\n<i>comedy in hawaii</i>\n<i>ridley scott columbus expedition</i>\nOR\nSearch by typing exact movie quotes using quotations marks:\n"may the force be with you"\nBest way to find actors is to use full name with quotation marks.', {'parse_mode': 'HTML'});
  } else {
    request(movieapi+encodeURIComponent(msg.text), function(err, res, data) {
      if (!err) {
        var movies = JSON.parse(data);
        console.log(res.statusCode);
        if (res.statusCode != 200) {
          bot.sendMessage(chatId, 'Sorry :( Service Temporarily Unavailable')
        }
        //console.log(movies);
        var i = 0;
        while (i < 5) {
          var el = movies[i];
          var title = el.title;
          var year = el.year;
          var imdblink = "http://www.imdb.com/title/"+el.imdb_id_long;
          bot.sendMessage(chatId, title+"\n"+imdblink);
          i++;
        }
      } else {
        console.log('Error!');
      }
    });
  }
});