'use strict'
const async = require('async')
const EventEmitter = require('events').EventEmitter
module.exports = function (images){
	let events = new EventEmitter()
	async.series([
		decodeImages,
		createVideo,
		encodeVideo,
		cleanup

	], converFinished)
	function decodeImages(done){
		done()

	}
	function createVideo(done){
		done()

	}
	function encodeVideo(done){
		done()
	}

	function cleanup(done){
		done()
	}
	function converFinished(err){
		setTimeout(function(){
			events.emit('video','This will be the encoded video')
		}, 1000)
	}
	
	return events
}