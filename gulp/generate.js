const prompt = require('gulp-prompt');
const fs = require('fs');
const path = require("path");
const intercept = require('gulp-intercept');
const _ = require('lodash');

/**
 * Generates components.
 */

module.exports = (gulp) => {
  'use strict';

  /**
   * Slightly messy Gulp task, but give it a try.
   * It generates React component stubs.
   */
  gulp.task('new-component', (callback)=> {
    let jsTemplate = {
      stateful: '',
      stateless: ''
    };
    let stateChoices = ['Stateful/Container/Smart', 'Stateless/Presentation/Dumb'];

    gulp.src('./components/_template/*.jsx')
      .pipe(intercept((file)=>{

        if (file.path.indexOf('stateful') > -1) {
          jsTemplate.stateful = file.contents.toString();
        }

        if (file.path.indexOf('stateless') > -1) {
          jsTemplate.stateless = file.contents.toString();
        }

        return file;
      }))
      .pipe(prompt.prompt([{
          type: 'input',
          name: 'cname',
          message: 'What will we call it?'
      },{
          type: 'checkbox',
          name: 'state',
          message: 'What type of React component would you like? Select an option with spacebar...',
          choices: stateChoices,
          validate: (state) => {
            return state.length === 1;
          }
      }], (res) => {
          let stateful = res.state[0] === stateChoices[0];
          let outputTemplate = stateful ? jsTemplate.stateful : jsTemplate.stateless;
          let camelName = _.camelCase(res.cname);
          let pascalName = _.upperFirst(camelName);
          let hyphenName = _.replace(res.cname, ' ', '-');
          let className = 'cpnt-' + _.toLower(hyphenName);
          let pathroot = stateful ? './components/container/' : './components/presentation/';
          let jsPath = pathroot + pascalName;
          let jsxFile = jsPath + '/' + pascalName + '.jsx';

          //Tests
          let testPath = pathroot.replace('./', './test/');
          let jsxTestFile = testPath + pascalName + '.test.jsx';

          //SASS
          let sassPath = pathroot + pascalName + '/sass';
          let sassFileSmall = sassPath + '/_small.scss';
          let sassFileMedium = sassPath + '/_medium.scss';
          let sassFileLarge = sassPath + '/_large.scss';
          let sassContent = '';

          //  TODO
          //- Make Option here to keep sass with component or not...
          //- Validate component name...
          //- Check component doesn't already exist...


          outputTemplate = _.replace(outputTemplate, /\<ComponentName\>/g, pascalName);
          outputTemplate = _.replace(outputTemplate, /\<ComponentClassName\>/g, className);


          /// Make component directory ///
          fs.mkdir(jsPath, () => {

            /// Make JSX ///
            fs.writeFile(jsxFile, outputTemplate);

            if (!stateful) {

              /// Make SASS ///
              fs.mkdir(sassPath, () => {

                sassContent = '/* Component: ' + pascalName + ': small screen size. \n\n';
                sassContent += 'Description... \n*/\n\n';
                sassContent += '.' + className + ' {\n\n}';

                fs.writeFile(sassFileSmall, sassContent);

                sassContent = '/* Component: ' + pascalName + ': medium screen size. \n\n';
                sassContent += 'Description... \n*/\n\n';
                sassContent += '.' + className + ' {\n\n}';

                fs.writeFile(sassFileMedium, sassContent);

                sassContent = '/* Component: ' + pascalName + ': large screen size. \n\n';
                sassContent += 'Description... \n*/\n\n';
                sassContent += '.' + className + ' {\n\n}';

                fs.writeFile(sassFileLarge, sassContent);

                //Rebuild the index
                gulp.start('sass-component-index');

              });
            }

            fs.mkdir(testPath, () => {
              fs.writeFile(jsxTestFile, 'const '+pascalName+' = require(\'../../.'+jsPath+'.jsx\');');
              callback();
            });

          });

      }));

  });

};
