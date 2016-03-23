const path = require('path')
//Llamamos el módulo st
const st = require('st')
//Usamos el módulo body npm install body ;)
const jsonBody = require('body/json')
//Llamamos el módulo course
const course = require('course')
//Objeto que creará las rutas
const router = course()

//Requerimos nuestro helper
const helper = require('../helper')
//Creamos la configuracion del módulo
const mount = st({
	//Asignamos la carpeta que definiremos como public
	path: path.join(__dirname,'..','public'),
	//Archivo principal
	index: 'index.html',
	passthrough: true
})
router.post('/process', function(req,res){
	jsonBody(req,res,{limit: 3*1024*1024}, function(err,body){
		if (err) return fail(err,res)
		
		var converter = helper.convertVideo(body.images)
		converter.on('video',function(video){
			res.setHeader('Content-Type','application/json')
			res.end(JSON.stringify({video: video}))
		})

		
	})
})

function onRequest(req,res){
	mount(req,res, function(err){
		if (err) return res.end(err.message)

		router(req,res,function(err){
			if (err) return fail(err,res)
			res.statusCode=404
			res.end(`Not found ${req.url}`)
		})
	})
}
function fail(err,res){
	res.statusCode=500
	res.setHeader('Content-Type','text/plain')
	res.end(err.message)
}
//EXportar la función onRequest que será llamada
module.exports = onRequest