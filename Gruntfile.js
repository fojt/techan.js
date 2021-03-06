module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    config: {
      banner: '/*\n' +
        ' TechanJS v<%= pkg.version %>\n' +
        " (c) 2014 - <%= grunt.template.today('yyyy') %> Andre Dumas | https://github.com/andredumas/techan.js\n" +
        '*/',
      dist: 'techan-<%= pkg.version %>'
    },

    clean: {
      dist: ['dist'],
      build: ['build']
    },

    filegen: {
      version: {
        options: {
          content: "'use strict';module.exports='<%= pkg.version %>';"
        },
        dest: 'build/version.js'
      }
    },

    browserify: {
      dev: {
        options: {
          // Thanks https://github.com/amitayd/grunt-browserify-jasmine-node-example/blob/2488181e29b09226f2a87202a851f996820eafb6/Gruntfile.js#L51
          require: grunt.file.expand({filter: 'isFile'}, './src/**/*.js', './<%= filegen.version.dest %>'),
          bundleOptions: {
            debug: true
          }
        },
        src: 'src/techan.js',
        dest: 'build/techan-bundle.js'
      },
      test: {
        options: {
          external: ['src/**/*.js'],
          bundleOptions: {
            debug: true
          }
        },
        src: ['test/spec/bundle/**/*.js'],
        dest: 'build/specs-bundle.js'
      },
      dist: {
        options: {
          bundleOptions: {
            standalone: 'techan'
          }
        },
        src: 'src/techan.js',
        dest: 'dist/techan.js'
      }
    },

    usebanner: {
      options: {
        position: 'top',
        banner: '<%= config.banner %>',
        linebreak: true
      },
      dist: {
        files: {
          src: '<%= browserify.dist.dest %>'
        }
      }
    },

    jsonlint: {
      bower: {
        src: ['bower.json']
      },
      dist: {
        src: ['package.json']
      }
    },

    jshint: {
      options: {
        jshintrc: ".jshintrc"
      },
      dev: {
        src: ['src/**/*.js', 'lib/**/*.js', 'Gruntfile.js', 'test/**/*.js', '<%= filegen.version.dest %>']
      }
    },

    jscs: {
      options: {
        config: '.jscs.json'
      },
      dev: ['src/**/*.js', 'Gruntfile.js', 'test/**/*.js', '<%= filegen.version.dest %>']
    },

    watch: {
      files: '<%= jshint.dev.src %>',
      tasks: ['dev', 'dist']
    },

    jasmine: {
      options: {
        vendor: ['bower_components/d3/d3.js', 'test/spec/common/**/*.js'],
        keepRunner: true
      },
      test: {
        options: {
          specs: '<%= browserify.test.dest %>',
          outfile: 'build/bundleSpecRunner.html'
        },
        src: '<%= browserify.dev.dest %>'
      },
      dist: {
        options: {
          specs: 'test/spec/standalone/**/*.js',
          outfile: 'build/standaloneSpecRunner.html'
        },
        src: '<%= browserify.dist.dest %>'
      },
      minify: {
        options: {
          specs: 'test/spec/standalone/**/*.js',
          outfile: 'build/standaloneMinSpecRunner.html'
        },
        src: '<%= uglify.dist.dest %>'
      }
    },

    uglify: {
      options: {
        banner: '<%= config.banner %>',
        sourceMap: true,
        report: 'min'
      },
      dist: {
        src: '<%= browserify.dist.dest %>',
        dest: 'dist/techan.min.js'
      }
    },

    compress: {
      dist: {
        options: {
          archive: 'dist/techan.zip'
        },
        expand: true,
        cwd: 'dist',
        src: ['*.js*'],
        dest: '<%= config.dist %>'
      }
    },

    bump: {
      options: {
        commit: true,
        commitMessage: 'Release %VERSION%',
        commitFiles: ['-a'],
        createTag: true,
        tagName: '%VERSION%',
        tagMessage: '%VERSION%',
        push: false
      }
    },

    connect: {
      server: {}
    }
  });

  require('load-grunt-tasks')(grunt);
  grunt.loadTasks('lib/grunt');

  grunt.registerTask('lint', ['jshint', 'jscs']);
  grunt.registerTask('dev', ['filegen:version', 'lint', 'browserify:dev', 'browserify:test', 'jasmine:test']);
  grunt.registerTask('dist', ['browserify:dist', 'usebanner', 'jasmine:dist']);
  grunt.registerTask('minify', ['uglify', 'jasmine:minify']);
  grunt.registerTask('serve', ['connect', 'watch']);
  grunt.registerTask('release:pre', ['bump-only:prerelease', 'default']);
  grunt.registerTask('release:minor', ['bump-only:minor', 'default', 'bump-commit']);
  grunt.registerTask('release:major', ['bump-only:major', 'default', 'bump-commit']);

  grunt.registerTask('default', ['jsonlint', 'bower', 'clean', 'dev', 'dist', 'minify', 'compress']);
};