"use strict";
let gulp = require('gulp');
let webpack = require('webpack-stream');
let browserSync = require('browser-sync').create();
let sass = require('gulp-sass');

gulp.task('default', function() {

  gulp.src('./index.js')
    .pipe(webpack({
      watch: true,
      output: {
        filename: 'bundle.js'
      },
      module: {
        loaders: [
          {
            test: /\.(jsx|js)$/,
            exclude: /node_modules/,
            loader: 'babel-loader?presets[]=es2015&presets[]=react'
          }
        ],
      },
    }))
    .pipe(gulp.dest('dist/'));

});




// Static server
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
    gulp.watch(['./index.js', './dist/bundle.js'], () => {
      browserSync.reload();
    });
});




gulp.task('sass', function () {
  return gulp.src('./sass/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist'));
});