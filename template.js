/*
 * grunt-init-gruntplugin
 * https://gruntjs.com/
 *
 * Copyright (c) 2016 "Cowboy" Ben Alman, contributors
 * Licensed under the MIT license.
 */

'use strict';

// Basic template description.
exports.description = 'Create a Grunt plugin, including Nodeunit unit tests.';

// Template-specific notes to be displayed before question prompts.
exports.notes = 'For more information about Grunt plugin best practices, ' +
  'please see the docs at http://gruntjs.com/creating-plugins';

// Template-specific notes to be displayed after question prompts.
exports.after = 'You should now install project dependencies with _npm ' +
  'install_. After that, you may execute project tasks with _grunt_. For ' +
  'more information about installing and configuring Grunt, please see ' +
  'the Getting Started guide:' +
  '\n\n' +
  'http://gruntjs.com/getting-started';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {

  init.process({type: 'grunt'}, [
    // Prompt for these values.
    init.prompt('name'),
    init.prompt('description', 'Another awesome WordPress site'),
    init.prompt('respository'),
    init.prompt('licenses'),
    init.prompt('version', '0.1.0'),
    init.prompt('author_name'),
    init.prompt('author_email'),
    init.prompt('author_url'),
    init.prompt('grunt_version'),
    {
      name: 'theme',
      message: 'Please specify a default theme to install from packagist:',
      default: 'lovecraft'
    },
    init.prompt('theme_version', function(value, props, done) {
      done(null, '*');
    }),
    {
      name: 'dev_db_name',
      message: 'Please specify the development database name:',
      default: 'wordpress'
    },
    {
      name: 'dev_db_user',
      message: 'Please specify the development database user:',
      default: 'wordpress'
    },
    {
      name: 'dev_db_password',
      message: 'Please specify the development database password:',
      default: ''
    },
    {
      name: 'dev_db_host',
      message: 'Please specify the development database host:',
      default: 'localhost'
    },
  ], function(err, props) {
    // Files to copy (and process).
    var files = init.filesToCopy(props);

    // Actually copy (and process) files.
    init.copyAndProcess(files, props);

    var composer = {
      "repositories": [
        {
          "type": "composer",
          "url": "http://wpackagist.org"
        }
      ],
      "require": {
        "php": ">=5.3",
        "johnpbloch/wordpress": "4.2"
      },
      "extra": {
        "wordpress-install-dir": "public/wp",
        "installer-paths": {
          "public/wp/wp-content/themes/{$name}": [],
          "public/wp/wp-content/plugins/{$name}/": []
        }
      }
    };

    // Configure and write composer
    var wpackagistTheme = 'wpackagist-theme/'+props.theme;
    composer.require[wpackagistTheme] = props.theme_version;
    composer.extra['installer-paths']['public/wp/wp-content/themes/{$name}'].push(wpackagistTheme);
    grunt.file.write('composer.json', JSON.stringify(composer, null, 2));

    // package.json file
    props.npm_test = 'grunt test';
    props.keywords = ['gruntplugin'];
    props.dependencies = {
      "grunt-composer": "^0.4.4",
      "grunt-contrib-clean": "^0.6.0",
      "grunt-file-creator": "^0.1.3",
      "grunt-exec": "^0.4.6",
      "grunt-prompt": "^1.3.0",
      "request": "^2.62.0",
      "grunt-replace": "^0.11.0",
      "grunt-contrib-copy": "^0.8.1"
    };
    props.devDependencies = {
      "grunt-contrib-watch": "~1.0.0"
    };
    init.writePackageJSON('package.json', props);

    // All done!
    done();
  });

};
