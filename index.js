'use strict';
var gutil = require('gulp-util');
var through = require('through2');
var dust = require('dustjs-linkedin');

module.exports = function (options) {
	options = options || {};

	if (options.preserveWhitespace) {
		dust.optimizers.format = function (ctx, node) {
			return node;
		};
	}

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
			var finalName = typeof options.name === 'function' && options.name(file) || file.relative;
			file.contents = new Buffer(dust.compile(file.contents.toString(), finalName));
			file.path = gutil.replaceExtension(file.path, '.js');
			cb(null, file);
		} catch (err) {
			cb(new gutil.PluginError('gulp-dust', err, {fileName: filePath}));
		}
	});
};
