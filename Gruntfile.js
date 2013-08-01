/*
 * grunt-contrib-qunit
 * http://gruntjs.com/
 *
 * Copyright (c) 2013 "Cowboy" Ben Alman, contributors
 * Licensed under the MIT license.
 */

'use strict'; module.exports = function(grunt) {

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
            port: 8000,
            base: '.'
          }   
        }   
    }, 
    monkeytestjs: {
      onlineUrl: {
        options: {
          urls: [
            // this will later on point to the monkeytestJS web demo page
            'http://themonkeys.github.io/MonkeytestJS/tests/index.html'
          ]
        }
      },
      localFileServerUrl: {
        options: {
          urls: [
            // this will later on point to the monkeytestJS web demo page
            'http://localhost:8000/tests/index.html'
          ]
        }
      }
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-internal');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('servertest', ['connect', 'monkeytestjs:localFileServerUrl']);

  // Whenever the "test" task is run, run some basic tests.
  grunt.registerTask('test', ['monkeytestjs:onlineUrl', 'servertest']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test', 'build-contrib']);

};
