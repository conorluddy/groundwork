"use strict";
let prompt = require('gulp-prompt');
let fs = require('fs');
let path = require("path");
let intercept = require('gulp-intercept');
let _ = require('lodash');

/**
 * Generate.js
 * Generates components.
 */

function trimString(str) {
  return str;
}

module.exports = (gulp) => {

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
          let camelName = _.camelCase(res.cname);
          let pascalName = _.upperFirst(camelName);
          let hyphenName = _.replace(res.cname, ' ', '-');
          let jsPath = './components/' + pascalName;
          let jsxFile = jsPath + '/' + pascalName + '.js';
          let sassPath = './components/' + pascalName + '/sass';
          let sassFileSmall = sassPath + '/_small.scss';
          let sassFileMedium = sassPath + '/_medium.scss';
          let sassFileLarge = sassPath + '/_large.scss';
          let sassContent = '';


          //  TODO
          //- Make Option here to keep sass with component or not
          //- Check component name for validity
          //- Ensure component doesn't already exist

          jsTemplate = _.replace(jsTemplate, '<ComponentName>', pascalName);

          /// Make component directory ///
          fs.mkdir(jsPath, () => {

            /// Make JSX ///

            fs.writeFile(jsxFile, jsTemplate);

            /// Make SASS ///
            fs.mkdir(sassPath, () => {

              sassContent = '/* Component: ' + pascalName + ': small screen size. \n\n';
              sassContent += 'If you\'re reading this, the dev who generated this component was too lazy \nto replace it with a component description :) \n*/\n\n';
              sassContent += '.' + hyphenName + ' {\n\n}';

              fs.writeFile(sassFileSmall, sassContent);

              sassContent = '/* Component: ' + pascalName + ': medium screen size. \n\n';
              sassContent += 'If you\'re reading this, the dev who generated this component was too lazy \nto replace it with a component description :) \n*/\n\n';
              sassContent += '.' + hyphenName + ' {\n\n}';

              fs.writeFile(sassFileMedium, sassContent);

              sassContent = '/* Component: ' + pascalName + ': large screen size. \n\n';
              sassContent += 'If you\'re reading this, the dev who generated this component was too lazy \nto replace it with a component description :) \n*/\n\n';
              sassContent += '.' + hyphenName + ' {\n\n}';

              fs.writeFile(sassFileLarge, sassContent);

              //Rebuild the index
              gulp.start('sass-build-component-index');
            });

          });

      }));

  });

};
