const path = require('path')
//Llamamos el módulo st
const st = require('st')

//Creamos la configuracion del módulo
const mount = st({
	//Asignamos la carpeta que definiremos como public
	path: path.join(__dirname,'..','public'),
	//Archivo principal
	index: 'index.html'
})

function onRequest(req,res){
	mount(req,res, function(err){
		if (err) return res.end(err.message)

		res.statusCode=404
		res.end(`Not found ${req.url}`)
	})
}
//EXportar la función onRequest que será llamada
module.exports = onRequest