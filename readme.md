# gulp-dust [![Build Status](https://travis-ci.org/sindresorhus/gulp-dust.svg?branch=master)](https://travis-ci.org/sindresorhus/gulp-dust)

> Precompile [Dust](https://github.com/linkedin/dustjs) templates

*Issues with the output should be reported on the Dust [issue tracker](https://github.com/linkedin/dustjs/issues).*


## Install

```
$ npm install --save-dev gulp-dust
```


## Usage

```js
var gulp = require('gulp');
var dust = require('gulp-dust');

gulp.task('default', function () {
	return gulp.src('templates/list.html')
		.pipe(dust())
		.pipe(gulp.dest('dist'));
});
```


## API

### dust([options])

#### options

##### name

Type: `function`  
Default: *Filename. Example: `templates/list.html` => `list`*

You can override the default behavior by supplying a function which gets the current [File](https://github.com/wearefractal/vinyl#constructoroptions) object and is expected to return the name. File extension is removed as dust#compile expects a template’s name.

Example:

```js
dust({
	name: function (file) {
		return 'custom';
	}
});
```
##### config

Type: `object`  
Default: `{whitespace: false, amd: false, cjs: false}`

Corresponds to `dust.config`.  Use it to override any dust configuration value.

###### whitespace

Type: `boolean`  
Default: `false`

Preserve whitespace.

###### amd

Type: `boolean`  
Default: `false`

Compile as AMD modules.

###### cjs

Type: `boolean`  
Default: `false`

Compile as CommonJS modules.


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
