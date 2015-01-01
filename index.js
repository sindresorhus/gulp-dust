'use strict';
var gutil = require('gulp-util');
var path = require('path');
var fs = require('fs');
var through = require('through2');
var dust = require('dustjs-linkedin');

module.exports = function (options) {
  if (!options)
    options = {}
  var basePath = options.basePath || '.';
  var data = options.data || {};
  var defaultExt = options.defaultExt || '.dust';
  var whitespace = options.whitespace || false;
  
  dust.onLoad = function(filePath, callback) {
    if(!path.extname(filePath).length)
      filePath += defaultExt;
    if(filePath.charAt(0) !== "/")
      filePath = basePath + "/" + filePath;

    fs.readFile(filePath, "utf8", function(err, html) {
      if(err) {
        console.error("Template " + err.path + " does not exist");
        return callback(err);
      }
      try {
        callback(null, html);
      } catch(err) {
        console.error("Error parsing file", err);
      }
    });
  };

  if (whitespace)
    dust.optimizers.format = function (ctx, node) { return node; };

  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      this.push(file);
      return cb();
    }

    if (file.isStream()) {
      this.emit('error', new gutil.PluginError('gulp-dust', 'Streaming not supported'));
      return cb();
    }

    try {
      var contextData = typeof data === 'function' ? data(file) : data;
      var finalName = typeof name === 'function' && name(file) || file.relative;
      var tmpl = dust.compileFn(file.contents.toString(), finalName);
      var that = this;
      tmpl(contextData, function(err, out){
        if (err){
          that.emit('error', new gutil.PluginError('gulp-dust', err));
          return; 
        }
        file.contents = new Buffer(out);
        file.path = gutil.replaceExtension(file.path, '.html');     
        that.push(file);
        cb();
      })
    } catch (err) {
      this.emit('error', new gutil.PluginError('gulp-dust', err));
    }
  });
};
