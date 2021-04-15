var express               = require('express'),
    app                   = express(),
    port                  = process.env.PORT || 4000;
    currDate              = Date();

app.use(express.static('public'));
app.set('view engine', 'html');

app.engine('html', require('ejs').renderFile);
app.get('/', function(req, res) {
    res.render('index.html');
});

app.listen(port, function () {
  console.log(currDate + " Server Has Started on 4000 for Face Tracking app!");
});
