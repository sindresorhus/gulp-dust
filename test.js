'use strict';
var assert = require('assert');
var gutil = require('gulp-util');
var dust = require('./index');

it('should precompile Dust templates', function (cb) {
	var stream = dust();

	stream.on('data', function (file) {
		assert.equal(file.relative, 'fixture.js');
		assert(/fixture/.test(file.contents.toString()));
		cb();
	});

	stream.write(new gutil.File({
		path: 'fixture.html',
		contents: new Buffer('*foo*')
	}));
});
