/* eslint-env mocha */
'use strict';
const path = require('path');
const assert = require('assert');
const Vinyl = require('vinyl');
const dust = require('.');

afterEach(() => {
	dust({
		config: {
			whitespace: false,
			amd: false,
			cjs: false
		}
	});
});

it('should precompile Dust templates', cb => {
	const stream = dust();

	stream.on('data', file => {
		assert.equal(file.relative.replace(/\\/g, '/'), 'fixture/fixture.js');
		assert(/fixture/.test(file.contents.toString()));
		cb();
	});

	stream.end(new Vinyl({
		base: __dirname,
		path: path.join(__dirname, 'fixture/fixture.html'),
		contents: Buffer.from('*foo*')
	}));
});

it('should support supplying custom name in a callback', cb => {
	let i = 0;
	const buffer = [];
	const stream = dust({
		name() {
			return 'custom' + ++i;
		}
	});

	stream.on('data', file => {
		buffer.push(file.contents.toString());
	});

	stream.on('end', () => {
		assert(buffer.length === 2);
		assert(/custom1/.test(buffer[0]));
		assert(/custom2/.test(buffer[1]));
		cb();
	});

	stream.write(new Vinyl({
		base: __dirname,
		path: path.join(__dirname, 'fixture/fixture.html'),
		contents: Buffer.from('*foo*')
	}));

	stream.write(new Vinyl({
		base: __dirname,
		path: path.join(__dirname, 'fixture/fixture2.html'),
		contents: Buffer.from('*foo*')
	}));

	stream.end();
});

it('should leave whitespace on demand', cb => {
	const stream = dust({
		config: {
			whitespace: true
		}
	});

	stream.on('data', file => {
		assert(/\\n/.test(file.contents.toString()));
		cb();
	});

	stream.end(new Vinyl({
		base: __dirname,
		path: path.join(__dirname, 'fixture/fixture.html'),
		contents: Buffer.from('*fo\no*')
	}));
});

it('should should support AMD modules', cb => {
	const stream = dust({
		config: {
			amd: true
		}
	});

	stream.on('data', file => {
		assert.equal(file.relative.replace(/\\/g, '/'), 'fixture/fixture.js');
		assert(/define\("fixture"/.test(file.contents.toString()));
		cb();
	});

	stream.end(new Vinyl({
		base: __dirname,
		path: path.join(__dirname, 'fixture/fixture.html'),
		contents: Buffer.from('*foo*')
	}));
});

it('should should support CJS modules', cb => {
	const stream = dust({
		config: {
			cjs: true
		}
	});

	stream.on('data', file => {
		assert(/^module\.exports=function/.test(file.contents.toString()));
		cb();
	});

	stream.end(new Vinyl({
		base: __dirname,
		path: path.join(__dirname, 'fixture/fixture.html'),
		contents: Buffer.from('*foo*')
	}));
});
