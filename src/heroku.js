'use strict';

var utils = require('./utils');
utils.setupConfig();
var logging = require('./logging');


require('./habitrpgServer.js').createServer().startService(function(){

  logging.info('service started');

});



