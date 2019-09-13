"use strict";

// var gulp = require('gulp');
// var less = require('gulp-less');
// var path = require('path');
//
// gulp.task('less', function () {
//   return gulp.src('./source/less/*.less')
//     .pipe(less({
//       paths: [ path.join(__dirname, 'less', 'includes') ]
//     }))
//     .pipe(gulp.dest('./source/css'));
// });

var gulp = require("gulp");
var less = require("gulp-less");
var path = require("path");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var browserSync = require("browser-sync").create();

gulp.task("style", function () {
  return gulp.src('./source/less/style.less')
    .pipe(plumber())
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest('./source/css'))
    .pipe(browserSync.stream());
});

// gulp.task("serve", ["style"], function() {
//   browserSync.init({
//     server: "source/"
//     // notify: false,
//     // open: true,
//     // cors: true,
//     // ui: false
//   });
//
//   gulp.watch("./source/less/**/*.less", ["style"]);
//   gulp.watch("*.html").on("change", server.reload);
// });

gulp.task("serve", function (done) {
    browserSync.init({
        server: "source/"
    });
    gulp.watch("source/less/**/*.less", gulp.series("style"));
    gulp.watch("source/*.html").on("change", () => {
        browserSync.reload();
        done();
    });

    done();
});
gulp.task("default", gulp.series("style", "serve"));
