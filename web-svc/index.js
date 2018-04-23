'use strict';

var express    = require('express');
var exphbs     = require('express-handlebars');
var bodyParser = require('body-parser');
var handlers   = require('./handlers');

var app = express();

const hbsOptions = {
    defaultLayout: 'main', 
    extname: 'handlebars',
    layoutsDir: __dirname + '/views/layouts/',
    helpers: {
        foo: function() { return 'FOO!'; },
        bar: function() { return 'BAR!'; }
    }
}
var hbs = exphbs.create(hbsOptions);

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({extended: true}));


// routes...

// root
app.get('/', function(req, res) {
    res.redirect('login');
});

// login
app.get('/login', function(req, res) {
    res.render('login');
});

app.post('/login', function(req, res) {
    const credentials = {
        username: req.body.username,
        password: req.body.password    
    };
    if(handlers.login(credentials)) {
        res.redirect('home?identified=true');
    } else {
        res.render('login', { error: true, errMsg: 'invalid credentials' });
    }
});

//register
app.get('/register', function(req, res) {
    res.render('register');
});

app.post('/register', function(req, res) {
    const user = {
        username: req.body.username,
        password: req.body.password,
        confirmation: req.body.confirmation
    };
    if(handlers.register(user)) {
        res.redirect('home?identified=true');
    } else {
        res.render('register', { error: true, errMsg: 'registration error' });
    }
});

//home
app.get('/home', function(req, res) {
    console.log(req.query.identified);
    if(req.query.identified) {
        const homeOptions = {
            title: 'My title...',
            identified: req.query.identified,
            items: [1,2,3],
            helpers: {
                foo: function() { return 'foo!'; }
            }
        };            
        res.render('home', homeOptions);
    } else {
        res.redirect('login');
    }
});


//
var server = app.listen(8080, 'localhost', function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log("listening at http://%s:%s", host, port);
});

