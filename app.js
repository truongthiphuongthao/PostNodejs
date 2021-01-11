const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const routes = require('./routes')

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))

// set view
app.set('views', './public/pages')
app.set('view engine', 'ejs')

// use routes
app.use('/', routes)

app.listen(8080, function(err){
	if(err){
		console.log(err)
		throw err
	}
	else{
		console.log("Server is starting at port 8080")
	}
})