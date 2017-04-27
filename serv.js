var http = require("http");
var fs = require("fs");
var bodyParser = require('body-parser');
var express = require('express');

var app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.get("/autok", function(req,res){
	fs.readFile(__dirname+"/autok.json","utf8",function(err,data){
	res.send(data);
	});
});

app.post("/addAuto", function(req,res){
	var autok = JSON.parse(fs.readFileSync(__dirname+"/autok.json"));
	autok.push(req.body);
	fs.writeFile(__dirname+"/autok.json",JSON.stringify(autok),function(err){
		res.send(err);
	});
});

app.get("/deleteAuto", function(req, res){
	if(req.query == undefined){
		return;
	}
	if(req.query['rendszam'] == undefined){
		res.send();
		return;
	}
	var autok = JSON.parse(fs.readFileSync(__dirname+"/autok.json"));
	
	autok = autok.filter(function(auto){ return auto.rendszam != req.query['rendszam'] });
	console.log(autok);
	fs.writeFile(__dirname+"/autok.json",JSON.stringify(autok),function(err){
		if(err != null){
		console.log(err);
		}
	});
	res.send();
});



var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})
