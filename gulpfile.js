var gulp   = require('gulp');
var tsc    = require('gulp-tsc');
var shell  = require('gulp-shell');
var runseq = require('run-sequence');
var tslint = require('gulp-tslint');
var browserSync = require('browser-sync');
var proxyMiddleware = require('http-proxy-middleware');
var conf = require('./conf');
var path = require('path');
var util = require('util');
var rjs = require('requirejs');

gulp.task('default', ['lint', 'buildrun']);

// ** Running ** //

gulp.task('run', shell.task([
  'node server.js'
]));

gulp.task('buildrun', function (cb) {
  runseq('build', 'run', cb);
});

gulp.task('livereload', ['watch'], function () {
  browserSyncInit([path.join(conf.paths.tmp, '/serve'), conf.paths.src]);
});

gulp.task('serve', ['run', 'livereload']);

// ** Watching ** //

gulp.task('watch', function () {
  gulp.watch(conf.paths.tscripts.src, ['build']);
  gulp.watch(conf.paths.tscripts.dest + '/**/*.js', browserSync.reload);
});

gulp.task('watchrun', function () {
  gulp.watch(conf.paths.tscripts.src, runseq('build', 'run'));
});

// ** Compilation ** //

gulp.task('build', ['compile:typescript', 'compile:requirejs']);
gulp.task('compile:typescript', function () {
  return gulp
  .src(conf.paths.tscripts.src)
  .pipe(tsc({
    module: "commonjs",
    emitError: false
  }))
  .pipe(gulp.dest(conf.paths.tscripts.dest));
});

gulp.task('compile:requirejs', function (cb) {
  var config = {
    baseUrl: "app/build/src",
    out: "dist/index.js",
    paths: {
      app: 'app',
      orbit: 'orbit',
      plant: 'plant',
      enemy: 'enemy'
    },
    include: [
      'app', 'orbit', 'plant', 'enemy'
    ]
  };

  return rjs.optimize(config, function(buildResponse) { cb(); }, cb);

});

// ** Linting ** //

gulp.task('lint', ['lint:default']);
gulp.task('lint:default', function(){
      return gulp.src(conf.paths.tscripts.src)
        .pipe(tslint())
        .pipe(tslint.report('prose', {
          emitError: false
        }));
});

function browserSyncInit(baseDir, browser) {
  browser = browser === undefined ? 'default' : browser;

  var routes = null;
  if(baseDir === conf.paths.src || (util.isArray(baseDir) && baseDir.indexOf(conf.paths.src) !== -1)) {
    routes = {
      '/bower_components': 'bower_components'
    };
  }

  var server = {
    baseDir: baseDir,
    routes: routes,
    middleware: [
      proxyMiddleware('/', { target: 'http://localhost:8000' })
    ]
  };

  /*
   * You can add a proxy to your backend by uncommenting the line below.
   * You just have to configure a context which will we redirected and the target url.
   * Example: $http.get('/users') requests will be automatically proxified.
   *
   * For more details and option, https://github.com/chimurai/http-proxy-middleware/blob/v0.9.0/README.md
   */
  // server.middleware = proxyMiddleware('/users', {target: 'http://jsonplaceholder.typicode.com', changeOrigin: true});

  browserSync.instance = browserSync.init({
    port: 9000,
    startPath: '/',
    server: server,
    browser: browser
  });
}