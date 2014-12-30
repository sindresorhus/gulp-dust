
> Render [dust](https://github.com/linkedin/dustjs) templates into HTML

*Issues with the output should be reported on the Dust [issue tracker](https://github.com/linkedin/dustjs/issues).*

## Install

```sh
$ npm install --save-dev gulp-dust-html dustjs-linkedin
```


## Usage

```js
var gulp = require('gulp');
var dust = require('dustjs-linkedin');
dust.helpers = require('dustjs-helpers').helpers;
var dusthtml = require('gulp-dust-html');

gulp.task('default', function () {
  return gulp.src('templates/index.html')
	 .pipe(dusthtml({
	   basePath: 'templates',
           data: data
         }))
	 .pipe(gulp.dest('dist'));
});
```


## API

### dust([options])

#### options

##### basePath

Type: `string`  
Default: `'.'`

Relative templates directory path (used to resolve partials). 
Example: `templates`


##### whitespace

Type: `boolean`  
Default: `false`

Preserve whitespace.

##### data

Type: `object` or `function`
Default: `{}`

Context which is passed to dust templates. If a function is provided the function will be called with one parameter, the name of the file

##### defaultExt

Type: `string`
Default: `.dust`

Default extension used for templates

## Todo

 - Update tests to reflect the new codebase
 - Think of a better way to handle context passing (maybe a `contents` directory?)


## License

MIT
