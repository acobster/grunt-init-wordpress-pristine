/*global module:false*/

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    clean: [
      'public/wp/wp-content/plugins/hello.php', // Goodbye, Dolly
      'public/wp/wp-content/themes/twentyten',
      'public/wp/wp-content/themes/twentyeleven',
      'public/wp/wp-content/themes/twentytwelve',
      'public/wp/wp-content/themes/twentythirteen',
      'public/wp/wp-content/themes/twentyfourteen',
      'public/wp/wp-config-sample.php'
    ],
    prompt: {
      environment: {
        options: {
          questions: [
            {
              config: 'environment',
              type: 'list',
              message: 'Which environment is this for?',
              default: 'development',
              choices: [
                { name: 'development', checked: true },
                { name: 'production' },
                { name: 'staging' }
              ]
            }
          ]
        }
      },
      admin: {
        options: {
          questions: [
            {
              config: 'option_home',
              type: 'input',
              message: 'WP home URL:'
            },
            {
              config: 'option_title',
              type: 'input',
              message: 'WP Title:'
            },
            {
              config: 'admin_user',
              type: 'input',
              message: 'Admin username:'
            },
            {
              config: 'admin_password',
              type: 'password',
              message: 'Admin password:'
            },
            {
              config: 'admin_email',
              type: 'input',
              message: 'Admin email:'
            }
          ]
        }
      }
    },
    composer: {
      options: {},
      wordpress: {}
    },
    "file-creator": {
      "env_file": {
        ".env": function(fs, fd, done) {
          var env = grunt.config('environment');
          fs.writeSync(fd, env);
          done();
        }
      }
    },
    copy: {
      wp_config: {
        files: [
          {
            expand: true,
            flatten: true,
            src: '_wp/wp-config.php',
            dest: 'public/wp/'
          }
        ]
      }
    },
    exec: {
      wp_core_install: {
        command: function() {
          return 'wp core install'
            + ' --url='+grunt.config('option_home')
            + ' --title="'+grunt.config('option_title')+'"'
            + ' --admin_user='+grunt.config('admin_user')
            + ' --admin_password='+grunt.config('admin_password')
            + ' --admin_email='+grunt.config('admin_email');
        },
        cwd: 'public/wp'
      },
      wp_set_install_dir: {
        command: function() {
          return 'wp option set siteurl '+grunt.config('option_home')+'/wp';
        },
        cwd: 'public/wp'
      },
      wp_activate_theme: {
        command: function() {
          var config = grunt.file.readJSON('wp-config.json'),
              theme = config.active_theme.name;

          return 'wp theme activate '+theme;
        },
        cwd: 'public/wp'
      },
      wp_activate_plugins: {
        command: function() {
          var config = grunt.file.readJSON('wp-config.json'),
              plugins = config.active_plugins,
              cmd = 'wp plugin activate';

          for( var i=0; i<plugins.length; i++ ) {
            cmd += ' '+plugins[i].name;
          }

          return cmd;
        },
        cwd: 'public/wp'
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-composer');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-file-creator');
  grunt.loadNpmTasks('grunt-prompt');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-exec');

  // Default task.
  grunt.registerTask('start', [
    'prompt',
    'file-creator',
    'composer:wordpress:install',
    'clean',
    'copy',
    'exec'
  ]);
};
