var gulp = require('gulp');
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var compile = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var vinylPaths = require('vinyl-paths');
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var historyApiFallback = require('connect-history-api-fallback');

var path = {
  "src": "src/",
  "srcApp": "src/app/**/*.js",
  "srcHtml": "src/*.html",
  "srcAppHtml": "src/app/**/*.html",
  "srcLib": "src/lib/**/*",
  "test": "test/",
  "dist": "dist/",
  "distApp": "dist/app/",
  "distLib": "dist/lib/",
  "assets": "src/assets/**/*",
  "distAssets": "dist/assets/",
  "libs": [
    'bower_components/**/polymer/**/*.html',
    'bower_components/**/iron*/*.html',
    'bower_components/**/iron*/**/classes/*.html',
    'bower_components/**/iron*/*.js',
    'bower_components/**/paper*/*.html',
    'bower_components/**/paper*/*.js',
    'bower_components/**/paper*/*.css',
    'bower_components/**/platinum*/*.html',
    'bower_components/**/platinum*/*.js',
    'bower_components/**/neon*/*.html',
    'bower_components/**/neon*/*.js',
    'bower_components/**/webcomponentsjs/**/*.js',
    'bower_components/**/font-roboto/*.html',
    'bower_components/**/neon-animation/*.html',
    'bower_components/**/neon-animation/**/animations/*.html',
    'bower_components/**/web-animations-js/*.js'
  ]
};

var compileOptions = {
  modules: 'system',
  compact: false,
  stage: 2,
  moduleIds: false,
  comments: false,
  optional: [
    'es7.decorators',
    'es7.classProperties'
  ]
};

function logChange(event) {
  console.log('File: ' + event.path + ' was ' + event.type + ', running tasks...');
}

gulp.task('clean', function() {
  return gulp.src(path.dist).pipe(vinylPaths(del));
});

gulp.task('build-html', function() {
  return (gulp.src(path.srcHtml).pipe(gulp.dest(path.dist)) &&
    gulp.src(path.srcAppHtml).pipe(gulp.dest(path.distApp)));
});

gulp.task('build-assets', function() {
  return gulp.src(path.assets).pipe(gulp.dest(path.distAssets));
});

gulp.task('build-lib', function() {
  return gulp.src(path.libs).pipe(gulp.dest(path.distLib));
});

gulp.task('build-patchlib', function() {
  return gulp.src(path.srcLib).pipe(gulp.dest(path.distLib));
});

gulp.task('build-js', function() {
  return gulp.src(path.srcApp)
    .pipe(plumber())
    .pipe(changed(path.distApp), {
      extension: '.js'
    })
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    .pipe(compile({}, compileOptions))
    .pipe(sourcemaps.write({
      includeContent: true
    }))
    .pipe(gulp.dest(path.distApp));
});

gulp.task('build-dev', function() {
  return runSequence('clean', 'build-lib', 'build-patchlib', ['build-js', 'build-html', 'build-assets']);
});

gulp.task('watch', ['build-dev'], function() {
  browserSync({
    open: false,
    port: 9000,
    server: {
      baseDir: ['dist'],
      middleware: [historyApiFallback()],
      routes: {
        '/jspm_packages': 'jspm_packages',
        '/webcomponentsjs': 'dist/lib/webcomponentsjs'
      }
    }
  });
  gulp.watch(path.srcApp, ['build-js', reload]).on('change', logChange);
  gulp.watch(path.assets, ['build-assets', reload]).on('change', logChange);
  gulp.watch(path.srcHtml, ['build-html', reload]).on('change', logChange);
  gulp.watch(path.srcAppHtml, ['build-html', reload]).on('change', logChange);
});
