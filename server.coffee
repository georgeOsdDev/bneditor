# module dependencies
express  = require 'express'
http     = require 'http'
path     = require 'path'

app = express()
app.configure ->
  app.set 'port', process.env?.PORT || 3000
  app.use express.static(path.join(__dirname, '/public'))
  app.use express.bodyParser()

app.configure 'development', ->
  app.use express.errorHandler({ dumpExceptions: true, showStack: true })

app.configure 'production', ->
  app.use express.errorHandler()

app.post '/save', (req, res, next) ->
  res.setHeader("Content-Disposition", "attachment; filename=text.txt")
  res.write req.body.text
  res.end()

console.log "Express server listening on port #{app.get('port')} in #{app.settings.env}"
console.log "Go http://#{process.env.VCAP_APP_HOST || 'localhost'}:#{app.get('port')}/"
http.createServer(app).listen(app.get('port'))
