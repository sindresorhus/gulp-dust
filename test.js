'use strict';
var assert = require('assert');
var gutil = require('gulp-util');
var dust = require('./');

afterEach(function resetConfig() {
	dust({ config: { whitespace: false, amd: false, cjs: false } });
});

it('should precompile Dust templates', function (cb) {
	var stream = dust();

	stream.on('data', function (file) {
		assert.equal(file.relative, 'fixture/fixture.js');
		assert(/fixture\\\/fixture/.test(file.contents.toString()));
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
	var stream = dust({
		name: function (file) {
			return 'custom' + ++i;
		}
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
	var stream = dust({ config: { whitespace: true } });

	stream.once('data', function (file) {
		assert(/\\n/.test(file.contents.toString()));
		cb();
	});

	stream.write(new gutil.File({
		base: __dirname,
		path: __dirname + '/fixture/fixture.html',
		contents: new Buffer('*fo\no*')
	}));
});

it('should should support AMD modules', function (cb) {
	var stream = dust({ config: { amd: true } });

	stream.on('data', function (file) {
		assert.equal(file.relative, 'fixture/fixture.js');
		assert(/define\("fixture\\\/fixture.html"/.test(file.contents.toString()));
		cb();
	});

	stream.write(new gutil.File({
		base: __dirname,
		path: __dirname + '/fixture/fixture.html',
		contents: new Buffer('*foo*')
	}));
});

it('should should support CJS modules', function (cb) {
	var stream = dust({ config: { cjs: true } });

	stream.on('data', function (file) {
		assert(/^module\.exports=function/.test(file.contents.toString()));
		cb();
	});

	stream.write(new gutil.File({
		base: __dirname,
		path: __dirname + '/fixture/fixture.html',
		contents: new Buffer('*foo*')
	}));
});

it('should work with deprecated whitespace option', function (cb) {
	var stream = dust({ preserveWhitespace: true });

	stream.once('data', function (file) {
		assert(/\\n/.test(file.contents.toString()));
		cb();
	});

	stream.write(new gutil.File({
		base: __dirname,
		path: __dirname + '/fixture/fixture.html',
		contents: new Buffer('*fo\no*')
	}));
});

it('should work with deprecated amd option', function (cb) {
	var stream = dust({ amd: true });

	stream.once('data', function (file) {
		assert.equal(file.relative, 'fixture/fixture.js');
		assert(/define\("fixture\\\/fixture.html"/.test(file.contents.toString()));
		cb();
	});

	stream.write(new gutil.File({
		base: __dirname,
		path: __dirname + '/fixture/fixture.html',
		contents: new Buffer('*foo*')
	}));
});
