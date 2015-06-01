'use strict';
var gutil = require('gulp-util');
var through = require('through2');
var dust = require('dustjs-linkedin');

module.exports = function (opts) {
	opts = opts || {};

	dust.config.whitespace = (opts.preserveWhitespace === true);
	dust.config.amd = (opts.amd === true);
	dust.config.cjs = (opts.cjs === true);

	return through.obj(function (file, enc, cb) {
		if (file.isNull()) {
			cb(null, file);
			return;
		}

		if (file.isStream()) {
			cb(new gutil.PluginError('gulp-dust', 'Streaming not supported'));
			return;
		}

		var filePath = file.path;

		try {
			var finalName = typeof opts.name === 'function' && opts.name(file) || file.relative;
			file.contents = new Buffer(dust.compile(file.contents.toString(), finalName));
			file.path = gutil.replaceExtension(file.path, '.js');
			this.push(file);
		} catch (err) {
			this.emit('error', new gutil.PluginError('gulp-dust', err, {fileName: filePath}));
		}

		cb();
	});
};
