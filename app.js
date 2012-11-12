require('coffee-script');
require(__dirname+'/server.coffee')
process.on('uncaughtException', function(err){
  console.log("uncoughtException: " + err);
});
