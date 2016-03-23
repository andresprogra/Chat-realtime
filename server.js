/* Inicio del servidor básico */
//JavaScript estricto
'use strict'
//Variables constantes, porqué los módulos que requerimos no queremos que cambien en algún momento.
const http = require('http')
const fs = require('fs')
const path = require('path')
//Accedemos a las variables de entorno para ver en que puerto podemos escuchar
//Si el primer valor es falso se asignará el 8080
const port = process.env.PORT || 8080
//Permitirá hacer un servidor Web con io.js
//Se crea un servidor con iojs
const server = http.createServer()
//Nuestro servidor escuchará en un puerto, en el puerto 8080

//Se inician los eventos
server.on('request', onRequest)
server.on('listening', onListening)
server.listen(port)	
//Req = request, peticiones. 
//Res = response, respuestas
function onRequest(req, res){
	let uri = req.url
	if (uri.startsWith('/index') || uri === '/index.html' || uri === '/')
	{
		return serveIndex(res)
	}
	if (uri === '/app.js'){
		return serverApp(res)
	}
	res.statusCode = 404
	res.end(`404 Not found ${uri}`)


}
function serveIndex(res){
	let fileName = path.join(__dirname,'public','index.html')
	res.setHeader('Content-Type', 'text/html')
	let rs = fs.createReadStream(fileName)
	rs.pipe(res)
	rs.on('error', function(err){
		res.end(err.message)
	})
}
function serverApp (res){
	let app = path.join(__dirname,'public','app.js')
	
	res.setHeader('Content-Type', 'text/JavaScript')
	let rs = fs.createReadStream(app)
	rs.pipe(res)

	rs.on('error', function(err){
		res.setHeader('Content-Type', 'text/plain')
		res.end(err.message)
	})
}
function onListening(){
	console.log(`Escuchando en el puerto ${port}`)
}
/*Fin del servidor básico */