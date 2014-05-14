'use strict';
var gutil = require('gulp-util');
var through = require('through2');
var dust = require('dustjs-linkedin');

module.exports = function (options) {
	var name;
	var preserveWhitespace;
	if (typeof options === 'function') {
		/* Compatibility with earlier API */
		name = options;
		preserveWhitespace = false;
	} else if (typeof options === 'object') {
		name = options.name;
		preserveWhitespace = options.preserveWhitespace;
	}

	if (preserveWhitespace) {
		dust.optimizers.format = function(ctx, node) { return node; };
	}

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
			var finalName = typeof name === 'function' && name(file) || file.relative;
			file.contents = new Buffer(dust.compile(file.contents.toString(), finalName));
			file.path = gutil.replaceExtension(file.path, '.js');
		} catch (err) {
			this.emit('error', new gutil.PluginError('gulp-dust', err));
		}

		this.push(file);
		cb();
	});
};
