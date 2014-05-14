'use strict';
var assert = require('assert');
var gutil = require('gulp-util');
var dust = require('./index');

it('should precompile Dust templates', function (cb) {
	var stream = dust();

	stream.on('data', function (file) {
		assert.equal(file.relative, 'fixture/fixture.js');
		assert(/fixture\/fixture/.test(file.contents.toString()));
		cb();
	});

	stream.write(new gutil.File({
		base: __dirname,
		path: __dirname + '/fixture/fixture.html',
		contents: new Buffer('*foo*')
	}));
});

it('should support supplying custom name in a callback', function (cb) {
	var i = 0;
	var buffer = [];
	var stream = dust(function (file) {
		return 'custom' + ++i;
	});

	stream.on('data', function (file) {
		buffer.push(file.contents.toString());
	});

	stream.on('end', function () {
		assert(buffer.length === 2);
		assert(/custom1/.test(buffer[0]));
		assert(/custom2/.test(buffer[1]));
		cb();
	});

	stream.write(new gutil.File({
		base: __dirname,
		path: __dirname + '/fixture/fixture.html',
		contents: new Buffer('*foo*')
	}));

	stream.write(new gutil.File({
		base: __dirname,
		path: __dirname + '/fixture/fixture2.html',
		contents: new Buffer('*foo*')
	}));

	stream.end();
});

it('should leave whitespace on demand', function (cb) {
	var buffer;
	var customName = function (file) {
		return 'custom1';
	};

	var stream = dust({ name: customName, retainWS: true });

	stream.on('data', function (file) {
		buffer = file.contents.toString();
	});

	stream.on('end', function () {
		assert(/\\n/.test(buffer));
		cb();
	});

	stream.write(new gutil.File({
		base: __dirname,
		path: __dirname + '/fixture/fixture.html',
		contents: new Buffer('*fo\no*')
	}));

	stream.end();
});
