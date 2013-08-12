'use strict'; 

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/**/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    connect: {
        server: {
          options: {
            port: 9000,
            middleware: require('./tasks/monkeytestjs.js').proxy,
            base: '.'
          }   
        }   
    }, 
    monkeytestjs: {
      onlineUrl: {
        options: {
          urls: [
            // you can test external urls
            'http://themonkeys.github.io/MonkeytestJS/tests/index.html'
          ]
        }
      },
      localFileServerUrl: {
        options: {
          urls: [
            // you can run a server to test local files
            'http://localhost:9000/tests/index.html'
          ]
        }
      }
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('localUrl', ['connect', 'monkeytestjs:localFileServerUrl']);
  grunt.registerTask('test', ['monkeytestjs:onlineUrl', 'localUrl']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
