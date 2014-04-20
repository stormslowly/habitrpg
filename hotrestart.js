"use strict";
var fs = require('fs');
var PIDFILE = ".pids";


fs.readFile(PIDFILE,"utf-8",function(err,lines){

  console.log("lines",lines);
  fs.writeFileSync(PIDFILE, "");

  var x = lines.split('\n').
    map( function(str){ return  Number(str); } ).
    filter( function(num) { return (0!==num) ; }).
    map( function(pid){ return process.kill(pid); }) ;


  console.log(x);
});