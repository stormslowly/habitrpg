'use strict';

var cluster = require("cluster");
var nconf = require('nconf');
var utils = require('./utils');
var _ = require('lodash');
utils.setupConfig();
var logging = require('./logging');
var isProd = nconf.get('NODE_ENV') === 'production';
var isDev = nconf.get('NODE_ENV') === 'development';
var fs = require('fs');

var PIDFILE = ".pids";

if (cluster.isMaster && (isDev || isProd)) {
  // Fork workers.
  fs.writeFileSync(PIDFILE,"");
  _.times(_.min([require('os').cpus().length,2]), function(){
    cluster.fork();
  });

  cluster.on('disconnect', function(worker, code, signal) {
    var w = cluster.fork(); // replace the dead worker
    logging.info('[%s] [master:%s] worker:%s disconnect! new worker:%s fork', new Date(), process.pid, worker.process.pid, w.process.pid);
  });

} else {


  fs.appendFileSync(PIDFILE, ""+process.pid+"\n");

  require('./habitrpgServer.js').createServer().startService(function(){

    logging.info('service started');

  });

}

