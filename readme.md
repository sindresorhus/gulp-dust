# [gulp](http://gulpjs.com)-dust [![Build Status](https://travis-ci.org/sindresorhus/gulp-dust.svg?branch=master)](https://travis-ci.org/sindresorhus/gulp-dust)

> Precompile [Dust](https://github.com/linkedin/dustjs) templates

*Issues with the output should be reported on the Dust [issue tracker](https://github.com/linkedin/dustjs/issues).*


## Install

```bash
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

#### options.name

Type: `Function`
Default: *Relative template path. Example: `templates/list.html`*

You can override the default behavior by supplying a function which gets the current [File](https://github.com/wearefractal/vinyl#constructoroptions) object and is expected to return the name.

#### options.retainWS

Type: `Boolean`
Default: *false*

Prevent Dust from removing whitespace by setting the flag true.

Example:

```js
var tplPrefixer = function (file) {
	return 'tpl-' + file.relative;
};

dust({ name: tplPrefixer, retainWS: true });
```


## License

[MIT](http://opensource.org/licenses/MIT) © [Sindre Sorhus](http://sindresorhus.com)
