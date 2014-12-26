'use strict';
//
//  PortBalance.js
//
//  Created by Ryan Copley on 3/31/2014
//  Copyright (c) 2014 Ryan Copley. All rights reserved.
//

function portBalance(app, ports, networkInterface, callback){
    if (typeof networkInterface === 'function'){
        callback = networkInterface;
        networkInterface = null;
    }

    networkInterface = networkInterface || '0.0.0.0';

    if (ports.length > 0){
        var server = app.listen(ports[0], networkInterface, function (err) {
            if (!err){
                if (callback){
                    callback(null, ports[0]);
                }
            }
        });
        
        //If a EADDRINUSE error gets raised, try the next port. If one of them is successful, we're good to go.
        server.on("error", function (err){
            if (err.code === 'EADDRINUSE'){
                server.removeListener("error", function (err){}); // Always remove listeners!
                ports = ports.splice(1, ports.length);
                if (ports.length){
                    //Recurse and try a different port.
                    portBalance(app, ports, networkInterface);
                }else{
                    if (callback){
                        callback(new Error("All ports filled"));
                    }
                }
            }
        });
    }
}

module.exports = portBalance;