const express  = require ('express');
const hbs = require ('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();


hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');


app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`

  console.log(log);
  fs.appendFile('Server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to appent to server.log');
    }
  });
  next();
});

hbs.registerHelper('getCurrentYear',() => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text) => {
  return text.toUpperCase();
});

// app.use((req, res, next) => {
//   res.render('maintanance.hbs');
// });

app.use(express.static(__dirname + '/public'));//path to project directory + public folder

app.get('/',(req, res) => {
  // res.send('<h1>Hello Express!</h1>');
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'this is the home page'
  })
});

app.get('/about', (req,res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/bad', (req,res) => {
  res.send({
    error: 'not enough RAM',
    solution: 'download more RAM'
  })
});

app.get('/projects', (req,res) => {
  res.render('projects.hbs', {
    pageTitle: 'About Page',
    welcomeMessage: 'These are my projects'
  });
});


app.listen(port,() => {
  console.log(`Server is up on port ${port}`);
});
