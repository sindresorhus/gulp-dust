'use strict';
var path = require('path');
var es = require('event-stream');
var gutil = require('gulp-util');
var dust = require('dustjs-linkedin');

module.exports = function (name) {
	return es.map(function (file, cb) {
		var contents;
		var name = path.basename(file.path, path.extname(file.path));

		try {
			contents = dust.compile(file.contents.toString(), name);
		} catch (err) {
			return cb(new Error('gulp-dust: ' + err));
		}

		file.contents = new Buffer(contents);
		file.path = gutil.replaceExtension(file.path, '.js');
		cb(null, file);
	});
};
