/* Inicio del servidor básico */
//JavaScript estricto
'use strict'
//Variables constantes, porqué los módulos que requerimos no queremos que cambien en algún momento.
const  http = require('http')
const fs = require('fs')
//Accedemos a las variables de entorno para ver en que puerto podemos escuchar
//Si el primer valor es falso se asignará el 8080
const port = process.env.PORT || 8080
//Permitirá hacer un servidor Web con io.js
//Se crea un servidor con iojs
const server = http.createServer(onRequest)
//Nuestro servidor escuchará en un puerto, en el puerto 8080

//Se inician los eventos
server.on('request', onRequest)
server.on('listening', onListening)
server.listen(port)	
//Req = request, peticiones. 
//Res = response, respuestas
function onRequest(req, res){
	let file = fs.readFileSync('public/index.html')
	res.end(file)
}
function onListening(){
	console.log("Escuchando en el puerto " + port)
}
/*Fin del servidor básico */