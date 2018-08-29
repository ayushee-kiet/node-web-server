const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getFullYear', () => {
  return new Date().getFullYear();
});


hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});
app.set('view engine', 'hbs');
app.use(express.static(__dirname +'/public'));
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now} ${req.method} ${req.url}`;
  fs.appendFile('server.log', log + '\n', (err) => {
    // console.log('Unable to append to server.log');
  });
  console.log(log);
  next();
});

app.get('/', (req, res)=> {
    res.send('Hello Express');
});

app.get('/about', (req, res) =>   {
  res.render('about.hbs', {
    pageTitle:'Welcome, This is about page'
  })
});
app.listen(3000, () => {
  console.log('Server is up on port 3000.');
});
