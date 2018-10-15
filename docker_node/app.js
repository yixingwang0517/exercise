var express = require('express');
var redis = require('redis');
var app = express();

var redisHost = process.env['REDIS_PORT_6379_TCP_ADDR'];
var redisPort = process.env['REDIS_PORT_6379_TCP_PORT'];
var redisClient = redis.createClient(redisPort, redisHost);

app.get('/', function(req, res){
	console.log('get request');
	redisClient.get('access_count', function(err, countNum){
		if(err){
			return res.send('get access count error');
		}

		if(!countNum){
			countNum = 1;
		} else {
			countNum = parseInt(countNum) + 1
		}

		redisClient.set('access_count', countNum, function(err){
			if(err){
				return res.send('set access count error');
			}
			res.send(countNum.toString());
		});
	});
});

app.listen(8000);

