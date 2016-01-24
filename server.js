var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/www'));
app.use(bodyParser.json());


//  --------- Code for OANDA (will move to seperate module later) ------------

var prices  = require('./prices')
var instruments  = require('./instruments')
var https = require('https');

var details = [];
var pricesDetails = [];

var options = {
  hostname: 'api-fxpractice.oanda.com',
  path: '/v1/instruments?accountId=1149784',
  headers: {
    Authorization: 'Bearer ' + '44dc24c0bb8c25c8bbb97ed99452d10b-8006ae778caa4cfa5c43f566e8910ec6'
  }
};


callback = function(response) {
  var str = '';
  console.log("1")
  //another chunk of data has been recieved, so append it to `str`
  response.on('data', function (chunk) {
    str += chunk;
  });
  console.log("2")
  //the whole response has been received, so we just print it out here
  response.on('end', function () {
     console.log(str)
    var myobject = JSON.parse(str);

    for(var i in myobject.instruments) {

      var instrument     = myobject.instruments[i].instrument;
      var displayName    = myobject.instruments[i].displayName;
      var pip            = myobject.instruments[i].pip;
      var maxTradeUnits  = myobject.instruments[i].maxTradeUnits;
      var newInst = instruments(instrument, displayName, pip, maxTradeUnits);
      details.push(newInst)
    }
    //  console.log("i="+myobject.prices[i])
    //  var id     = myobject.prices[i].instrument;
    //  var time   = myobject.prices[i].time;
    //  var bid     = myobject.prices[i].bid;
    //  var ask = myobject.prices[i].ask;
    //  var newInst = prices(id, time, bid, ask);
    //  details.push(newInst)
    //};
  });
}

https.request(options, callback).end();

var https2 = require('https');
var options2 = {
  hostname: 'api-fxpractice.oanda.com',
  path: '/v1/prices?instruments=XPT_USD%2CUSD_JPY%2CEUR_CAD%2CXAG_GBP%2CXAU_AUD%2CXAG_SGD%2CUSD_CHF%2CUSD_NOK',
  headers: {
    Authorization: 'Bearer ' + '44dc24c0bb8c25c8bbb97ed99452d10b-8006ae778caa4cfa5c43f566e8910ec6'
  }
};

var callback2 = function(response) {
  var str = '';
  console.log("1")
  //another chunk of data has been recieved, so append it to `str`
  response.on('data', function (chunk) {
    str += chunk;
  });
  console.log("2")
  //the whole response has been received, so we just print it out here
  response.on('end', function () {
    console.log(str)
    var myobject = JSON.parse(str);
    console.log("push prices start");
    for(var i in myobject.prices) {
        console.log("i="+myobject.prices[i])
        var id     = myobject.prices[i].instrument;
        var time   = myobject.prices[i].time;
        var bid     = myobject.prices[i].bid;
        var ask = myobject.prices[i].ask;
        var newInst = prices(id, time, bid, ask);
        pricesDetails.push(newInst)
      console.log("push price");
    }

    //};
  });
}
https2.request(options2, callback2).end();
//  --------- End Code for OANDA  ------------


app.get('/instruments', function (req, res) {
  console.log('I received a GET request');
    res.json(details);
});

app.get('/prices', function (req, res) {
  console.log('I received a GET request');
  res.json(pricesDetails);
});

app.listen(3000);
console.log("Server running on port 3000");
