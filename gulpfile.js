// function defaultTask(cb) {
//   // place code for your default task here
//   cb();
// }
//
// exports.default = defaultTask

"use strict";

var less = require('gulp-less');
var gulp = require('gulp');
var path = require('path');

gulp.task('less', function () {
  return gulp.src('./source/less/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./source/css'));
});
