# Deprecated

The Dust project is no longer maintained.

---

# gulp-dust [![Build Status](https://travis-ci.org/sindresorhus/gulp-dust.svg?branch=master)](https://travis-ci.org/sindresorhus/gulp-dust)

> Precompile [Dust](https://github.com/linkedin/dustjs) templates

*Issues with the output should be reported on the Dust [issue tracker](https://github.com/linkedin/dustjs/issues).*


## Install

```
$ npm install --save-dev gulp-dust
```


## Usage

```js
const gulp = require('gulp');
const dust = require('gulp-dust');

gulp.task('default', () =>
	gulp.src('templates/list.html')
		.pipe(dust())
		.pipe(gulp.dest('dist'))
);
```


## API

### dust([options])

#### options

Type: `Object`

##### name

Type: `Function`<br>
Default: Filename (`templates/list.html` => `list`)

You can override the default behavior by supplying a function which gets the current [File](https://github.com/wearefractal/vinyl#constructoroptions) object and is expected to return the name.

Example:

```js
dust({
	name: file => 'custom'
});
```

##### config

Type: `Object`<br>
Default: `{whitespace: false, amd: false, cjs: false}`

Corresponds to `dust.config`.  Use it to override any dust configuration value.

###### whitespace

Type: `boolean`<br>
Default: `false`

Preserve whitespace.

###### amd

Type: `boolean`<br>
Default: `false`

Compile as AMD modules.

###### cjs

Type: `boolean`<br>
Default: `false`

Compile as CommonJS modules.


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
