"use strict";
// let ffmpeg = require('gulp-fluent-ffmpeg');
const imageResize = require('gulp-image-resize');
const imagemin = require('gulp-imagemin');

/**
 * Assets - images, fonts, svg, and other non-codey bits...
 */


module.exports = (gulp) => {

    gulp.task('assets', () => {
      gulp.start('assets-content-images');
      gulp.start('assets-hero-images');
      gulp.start('assets-ui-images');
      gulp.start('assets-gifs');

      //TODO optimise
      gulp.src(['./assets/fonts/**/*']).pipe(gulp.dest('dist/assets/fonts'));
      gulp.src(['./assets/audio/**/*']).pipe(gulp.dest('dist/assets/audio'));
      gulp.src(['./assets/video/**/*']).pipe(gulp.dest('dist/assets/video'));
    });


    gulp.task('assets-content-images', ['assets'], () => {
      gulp.src('./assets/images/content/*.jpg')
        .pipe(imageResize({
          width : 1440,
          crop : false,
          upscale : false,
          quality: 0.9,
          filter: 'Catrom'
        }))
        .pipe(imagemin())
        .pipe(gulp.dest('dist/assets/images/content'))

        //Small (50%) version

        .pipe(imageResize({
          width : 720,
          crop : false,
          upscale : false,
          quality: 0.8,
          filter: 'Catrom'
        }))
        .pipe(imagemin())
        .pipe(gulp.dest('dist/assets/images/content/small'));
    });




    gulp.task('assets-hero-images', () => {
      gulp.src('./assets/images/hero/*.jpg')
        .pipe(imageResize({
          width : 1920,
          crop : false,
          upscale : false,
          quality: 0.9,
          filter: 'Catrom'
        }))
        .pipe(imagemin())
        .pipe(gulp.dest('dist/assets/images/hero'))

        //Small (50%) version

        .pipe(imageResize({
          width : 960,
          crop : false,
          upscale : false,
          quality: 0.8,
          filter: 'Catrom'
        }))
        .pipe(imagemin())
        .pipe(gulp.dest('dist/assets/images/hero/small'))
    });




    gulp.task('assets-ui-images', () => {
      gulp.src('./assets/images/ui/*')
        .pipe(gulp.dest('dist/assets/images/ui'))
    });




    gulp.task('assets-gifs', () => {
      gulp.src('./assets/images/content/*.gif')
        .pipe(gulp.dest('dist/assets/images/content/'))
    });



    // gulp.task('video', function () {
    //   return gulp.src('./assets/video/*.mov')
    //     .pipe(ffmpeg('mp3', function (cmd) {
    //       return cmd
    //         .audioBitrate('128k')
    //         .audioChannels(2)
    //         .audioCodec('libmp3lame')
    //     }))
    //     .pipe(gulp.dest('dist/assets/video'));
    // });
    //


};
