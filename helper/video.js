'use strict'
const os = require('os')
const fs = require('fs')
const path = require('path')
const async = require('async')
const uuid = require('uuid')
const dataURIBuffer = require('data-uri-to-buffer')
const EventEmitter = require('events').EventEmitter
cost listFiles = require('./lista')
module.exports = function (images){
	let events = new EventEmitter()
	let count = 0
	let baseName = uuid.v4()
	let tmpDir = os.tmpdir()
	async.series([
		decodeImages,
		createVideo,
		encodeVideo,
		cleanup

	], converFinished)
	function decodeImages(done){
		async.eachSeries(images, decodeImage, done)

	}
	function decodeImage(image,done){
		//La imagen la vamos a convertir a buffer
		let fileName = `${baseName}-${count++}.jpg`
		let buffer = dataURIBuffer(image)
		let ws = fs.createWriteStream(path.join(tmpDir, fileName))
		ws.on('error',done)
			.end(buffer,done)
		events.emit('log', `Converting ${fileName}`)

	}
	function createVideo(done){
		done()

	}
	function encodeVideo(done){
		done()
	}

	function cleanup(done){
		events.emit('log','Cleaning up')
		listFiles(tmpDir, baseName, function(err,files){
			if (err) return done(err)
			//Borrado de archivos
			done()
		})
	}
	function converFinished(err){
		setTimeout(function(){
			events.emit('video','This will be the encoded video')
		}, 1000)
	}
	
	return events
}