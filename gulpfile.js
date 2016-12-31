"use strict";

let gulp = require('gulp');
let webpack = require('webpack-stream');
let browserSync = require('browser-sync').create();
let sass = require('gulp-sass');
let prompt = require('gulp-prompt');
let fs = require('fs');
let path = require("path");
let intercept = require('gulp-intercept');


gulp.task('default', () => {
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


  browserSync.init({
      server: {
          baseDir: "./dist"
      }
  });

  gulp.watch(['./index.js', './dist/*'], () => {
    browserSync.reload();
  });

  gulp.watch('sass/**/*', () => {
    gulp.start('sass');
  });

});


gulp.task('sass', () => {
  return gulp.src('./sass/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist'));
});







gulp.task('component', ()=> {
  let jsTemplate;

  gulp.src('./components/_template/index.js')
    .pipe(intercept((file)=>{
      jsTemplate = file.contents.toString();
      return file;
    }))
    .pipe(prompt.prompt({
        type: 'input',
        name: 'cname',
        message: 'New component name:'
    }, (res) => {
        let jsPath = './components/' + res.cname;
        let jsxFile = jsPath + '/index.jsx';

        //  TODO
        //- Make Option here to keep sass with component or not
        //- Check component name for validity
        //- Ensure component doesn't already exist

        let sassPath = './components/' + res.cname + '/sass';
        let sassFileSmall = sassPath + '/_small.scss';
        let sassFileMedium = sassPath + '/_medium.scss';
        let sassFileLarge = sassPath + '/_large.scss';
        let sassContent = '';

        /// Make component directory ///
        fs.mkdir(jsPath, () => {

          /// Make JSX ///
          fs.writeFile(jsxFile, jsTemplate);

          /// Make SASS ///
          fs.mkdir(sassPath, () => {

            sassContent = '// Component: ' + res.cname + ': small screen size. \n';
            sassContent += '// Please give a brief description of the component\n\n';
            sassContent += '.' + res.cname + ' {\n\n}';

            fs.writeFile(sassFileSmall, sassContent);

            sassContent = '// Component: ' + res.cname + ': medium screen size. \n';
            sassContent += '// Please give a brief description of the component\n\n';
            sassContent += '.' + res.cname + ' {\n\n}';

            fs.writeFile(sassFileMedium, sassContent);

            sassContent = '// Component: ' + res.cname + ': large screen size. \n';
            sassContent += '// Please give a brief description of the component\n\n';
            sassContent += '.' + res.cname + ' {\n\n}';

            fs.writeFile(sassFileLarge, sassContent);

            //Rebuild the index
            gulp.start('sass-build-component-index');
          });

        });

    }));

});





gulp.task('sass-build-component-index', () => {

  let sassContentSmall = '';
  let sassContentMedium = '';
  let sassContentLarge = '';

  //Get list of components
  fs.readdir('./components', function(err, items) {
      // console.log(items);
      for (let i=0; i<items.length; i++) {
        //Ignore directories beginning with _underscore
        if (items[i].indexOf('_') !== 0) {
          sassContentSmall += '@import \"../../components/' + items[i] + '/sass/_small.scss\"\;\n';
          sassContentMedium += '@import \"../../components/' + items[i] + '/sass/_medium.scss\"\;\n';
          sassContentLarge += '@import \"../../components/' + items[i] + '/sass/_large.scss\"\;\n';
        }
      }

      fs.writeFile('./sass/components/_small.scss', sassContentSmall);
      fs.writeFile('./sass/components/_medium.scss', sassContentMedium);
      fs.writeFile('./sass/components/_large.scss', sassContentLarge);
  });

})
