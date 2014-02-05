# [gulp](http://gulpjs.com)-dust [![Build Status](https://secure.travis-ci.org/sindresorhus/gulp-dust.png?branch=master)](http://travis-ci.org/sindresorhus/gulp-dust)

> Precompile [Dust](https://github.com/linkedin/dustjs) templates

*Issues with the output should be reported on the Dust [issue tracker](https://github.com/linkedin/dustjs/issues).*


## Install

Install with [npm](https://npmjs.org/package/gulp-dust)

```
npm install --save-dev gulp-dust
```


## Example

```js
var gulp = require('gulp');
var dust = require('gulp-dust');

gulp.task('default', function () {
	gulp.src('templates/list.html')
		.pipe(dust())
		.pipe(gulp.dest('dist'));
});
```


## API

### dust([name])

#### name

Type: `Function`  
Default: *Relative template path. Example: `templates/list.html`*

You can override the default behavior by supplying a function which gets the current [File](https://github.com/wearefractal/vinyl#constructoroptions) object and is expected to return the name.

Example:

```js
dust(function (file) {
	return 'tpl-' + file.relative;
})
```


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
