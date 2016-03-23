const path = require('path')
//Llamamos el módulo st
const st = require('st')
//Llamamos el módulo course
const course = require('course')
//Objeto que creará las rutas
const router = course()
//Creamos la configuracion del módulo
const mount = st({
	//Asignamos la carpeta que definiremos como public
	path: path.join(__dirname,'..','public'),
	//Archivo principal
	index: 'index.html',
	passthrough: true
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
//EXportar la función onRequest que será llamada
module.exports = onRequest