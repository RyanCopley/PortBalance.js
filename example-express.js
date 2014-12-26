'use strict';
//
//  PortBalance.js
//
//  Created by Ryan Copley on 3/31/2014
//  Copyright (c) 2014 Ryan Copley. All rights reserved.
//

var express        = require('express');
var app            = express();

var portBalance = require("./portBalance.js");
portBalance(app, [8000, 8001, 8002], '0.0.0.0', function (err, port){
    if (!err){
        console.log("PortBalanced to port: "+port);
    }else{
        //Error PortBalancing, probably should just exit the process.
        console.log(err.message);
        process.exit();
    }
});
