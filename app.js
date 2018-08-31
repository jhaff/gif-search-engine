//import neccessary dependencies
var giphy = require('giphy-api')();
var express = require('express');
var app = express();
var exphbs  = require('express-handlebars');
var http = require('http');


app.use(express.static('public'));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//root route
app.get("/", function (req, res) {
    giphy.search(req.query.term, function (err, response) {
        if (err != null) {
            // console.log("CRASHED: ", err);
            giphy.trending(function (err, response) {
                res.render('home', {gifs: response.data});
            })
        } else {
            console.log(response.data);
            res.render('home', {gifs: response.data});
        }
    });
});


app.get('/greetings/:name', function (req, res) {
  var name = req.params.name;
  res.render('greetings', {name: name});
})


//start actual server
app.listen(3000, function () {
  console.log('Gif Search listening on port localhost:3000!');
});
