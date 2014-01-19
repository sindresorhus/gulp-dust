'use strict';
var path = require('path');
var gutil = require('gulp-util');
var through = require('through2');
var dust = require('dustjs-linkedin');

module.exports = function (name) {
	return through.obj(function (file, enc, cb) {
		if (file.isNull()) {
			this.push(file);
			return cb();
		}

		if (file.isStream()) {
			this.emit('error', new gutil.PluginError('gulp-dust', 'Streaming not supported'));
			return cb();
		}

		try {
			var name = path.basename(file.path, path.extname(file.path));
			var contents = dust.compile(file.contents.toString(), name);
			file.contents = new Buffer(contents);
			file.path = gutil.replaceExtension(file.path, '.js');
		} catch (err) {
			this.emit('error', new gutil.PluginError('gulp-dust', err));
		}

		this.push(file);
		cb();
	});
};
