"use strict";
const gulp = require('gulp');
const browserSync = require('browser-sync').create();

/*
 * Modular Gulp files
 */
require('./gulp/assets.js')(gulp);
require('./gulp/browsersync.js')(gulp, browserSync);
require('./gulp/content.js')(gulp);
require('./gulp/css.js')(gulp);
require('./gulp/documentation.js')(gulp);
require('./gulp/generate.js')(gulp);
require('./gulp/js.js')(gulp);
require('./gulp/webpack.js')(gulp);
require('./gulp/deploy.js')(gulp);


/**
 * Default runs Webpack, BrowserSync, Watches...
 */
gulp.task('default', ['sass-component-index'], () => {

  gulp.start('assets');
  gulp.start('sass');
  gulp.start('webpack');
  gulp.start('browserSync');
  gulp.start('content');
  gulp.src('./index.html').pipe(gulp.dest('dist/'));

  gulp.watch(['./sass/**/*.scss', './components/**/*.scss'], () => {
    gulp.start('sass');
  });

  gulp.watch(['./components/**/*', './modules/**/*'], () => {
    gulp.start('webpack');
  });

  gulp.watch(['./dist/*'], browserSync.reload);

  gulp.watch(['./content/**/*'], () => {
    gulp.start('content');
  });
});
