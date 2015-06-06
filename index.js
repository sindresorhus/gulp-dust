'use strict';
var util = require('util');
var gutil = require('gulp-util');
var through = require('through2');
var dust = require('dustjs-linkedin');
var objectAssign = require('object-assign');

function deprecate(optName, configName) {
	return util.deprecate(function (opts) {
		opts.config = opts.config || {};

		// don't overwrite existing config value
		if (!(configName in opts.config)) {
			opts.config[configName] = opts[optName];
		}
	}, 'options.' + optName + ' is deprecated, use options.config.' + configName + ' instead');
}

var setWhitespace = deprecate('preserveWhitespace', 'whitespace');
var setAmd = deprecate('amd', 'amd');

module.exports = function (opts) {
	opts = opts || {};

	if (opts.preserveWhitespace) {
		setWhitespace(opts);
	}

	if (opts.amd) {
		setAmd(opts);
	}

	objectAssign(dust.config, opts.config);

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
