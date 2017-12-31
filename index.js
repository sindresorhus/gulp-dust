'use strict';
const path = require('path');
const through = require('through2');
const dust = require('dustjs-linkedin');
const PluginError = require('plugin-error');

module.exports = options => {
	options = options || {};

	Object.assign(dust.config, options.config);

	return through.obj(function (file, enc, cb) {
		if (file.isNull()) {
			cb(null, file);
			return;
		}

		if (file.isStream()) {
			cb(new PluginError('gulp-dust', 'Streaming not supported'));
			return;
		}

		const filePath = file.path;

		try {
			const tplName = (typeof options.name === 'function' && options.name(file)) ||
				path.basename(file.path, path.extname(file.path));
			file.contents = Buffer.from(dust.compile(file.contents.toString(), tplName));
			file.extname = '.js';
			this.push(file);
		} catch (err) {
			this.emit('error', new PluginError('gulp-dust', err, {fileName: filePath}));
		}

		cb();
	});
};
