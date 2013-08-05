[![Build Status](https://travis-ci.org/TheMonkeys/grunt-MonkeytestJS.png)](https://travis-ci.org/TheMonkeys/grunt-MonkeytestJS)

# grunt-monkeytestjs

This task will integrate MonkeytestJS by running integration tests in a headless PhantomJS instance or over an external URL.

## Getting Started

```shell
npm install grunt-monkeytestjs --save-dev
```

Than add this to your `Gruntfile.js`

```js
grunt.loadNpmTasks('grunt-monkeytestjs');
```

`Gruntfile.js` example:

```js
// Project configuration.
grunt.initConfig({
connect: {
    server: {
      options: {
        port: 9000,
        middleware: require('./tasks/monkeytestjs.js').proxy,
        // keepalive: true,  // this will create a server and allow tests to be viewed over the browser
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

// A convenient task alias.
grunt.registerTask('localUrl', ['connect', 'monkeytestjs:localFileServerUrl']);
grunt.registerTask('test', ['monkeytestjs:onlineUrl', 'localUrl']);

```

## proxy 
The line `middleware: require('./tasks/monkeytestjs.js').proxy` is a nodejs iplementation of the proxy shipped with MonkeytestJS, in order to allow crossdomain tests to be performed.

## Contributors
   - Mitermayer Reis - @mitermayer
   - Peter Feltham  - @felthy


**Change log**

   - **0.0.6** - Fixed proxy errors on 302 and 301 redirecting posts, also pointed 'grunt-lib-phantomjs' on the package.json file to point to a fork while 'https://github.com/gruntjs/grunt-lib-phantomjs/pull/24' pull request is not merged.
   - **0.0.5** - Integrated a proxy to load cross domain files assync in order to work the same as the inbuild proxy.php that come with MonkeytestJS
   - **0.0.4** - Fixed a bug where wrong results were being shown, from the done    event getting fired before all testes were executed.
   - **0.0.3** - Add a new bridge and listeners for MonkeytestJS.onFinish event 
   - **0.0.2**  - Fixed timeout problems when QUnit.start couldn't be identified
   - **0.0.1** - Initial release and partial support to MonkeytestJS ( Only hardcoded config URLS )
