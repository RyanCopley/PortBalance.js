PortBalance.js
==============

Port Balancer for Node.JS

I run the same process multiple times to CPU load balance a service and it provides great results. We found it irritating to have to specify which ports at the OS level, so I developed this to make it easier.

If a port is being listened on, it will attempt the next port, etc. This way, if the app fails and crashes, when it restarts it will automatically find which port to use. 

Example: 
```
var express        = require('express');
var app            = express();

var portBalance = require("./portBalance.js");
//Pass your app and the possible ports you want to fill
portBalance(app, [8000, 8001, 8002], '0.0.0.0', function (err, port){
    if (!err){
        console.log("PortBalanced to port: "+port);
    }else{
        //Error PortBalancing, probably should just exit the process.
        console.log(err.message);
        process.exit();
    }
});
```
