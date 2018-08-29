var express = require('express');
var app = express();
var exphbs  = require('express-handlebars');
var http = require('http');
// INITIALIZE THE GIPHY-API LIBRARY
var giphy = require('giphy-api')();


app.use(express.static('public'));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
// app.get('/hello-gif', function (req, res) {
//   var gifUrl = 'http://media2.giphy.com/media/gYBVM1igrlzH2/giphy.gif'
//   res.render('hello-gif', {gifUrl: gifUrl})
// })

/* ROOT FONT STYLES */



app.get('/greetings/:name', function (req, res) {
  var name = req.params.name;
  res.render('greetings', {name: name});
})


app.get('/', function (req, res) {
  giphy.search(req.query.term, function (err, response) {
    res.render('home', {gifs: response.data})
  });
});

app.listen(3000, function () {
  console.log('Gif Search listening on port localhost:3000!');
});
