/*
 *     Module Dependencies
 */

var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    nodemon = require('gulp-nodemon'),
    minifyHTML = require('gulp-minify-html'),
    concatCss = require('gulp-concat-css'),
    minifyCss = require('gulp-minify-css'),
    less = require('gulp-less'),
    jshint = require('gulp-jshint'),
    path = require('path');

/*
 *     Gulp Tasks
 *     (browser-sync, nodemon, jshint, bootstrap, minify-html, less, styles)
 */

gulp.task('browser-sync', ['nodemon'], function() {
  browserSync({
    proxy: "localhost:8080",  
    port: 8081,  
    notify: true
  });
});

gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({
    script: 'server.js',
    ignore: [
      'gulpfile.js',
      'node_modules/'
    ]
  })
  .on('start', function () {
    if (!called) {
      called = true;
      cb();
    }
  })
  .on('restart', function () {
    setTimeout(function () {
      reload({ stream: false });
    }, 1000);
  });
});


gulp.task('jshint', function() {
  gulp.src('./src/js/main.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
  gulp.src(['./src/js/*.js'])
    .pipe(gulp.dest('./dist/js/'));
});  

gulp.task('minify-html', function() {
  var opts = {
    conditionals: true,
    spare:true
  };
  return gulp.src('./src/html/*')
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('./dist/html/'));
});

gulp.task('less', ['less:test','styles', 'bootstrap']);

gulp.task('less:test', function () {
  return gulp.src('./src/less/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('bootstrap', function() {
  gulp.src(['./src/css/bootstrap.min.css'])
    .pipe(concatCss("bootstrap.min.css"))
    .pipe(gulp.dest('./dist/css')); //
});

gulp.task('styles', function() {
  gulp.src(['./src/css/*.css'])
    .pipe(minifyCss({compatibility: 'ie8'}))
    //.pipe(concatCss("styles.css"))
    .pipe(gulp.dest('./dist/css')); //
});


gulp.task('default', ['jshint','minify-html', 'less','browser-sync'], function () {
  gulp.watch('./src/less/*.less', ['less'], reload);   // watching for file changes
  gulp.watch('./src/html/*.html', ['minify-html'], reload);   // watching for file changes
  gulp.watch('./src/js/*.js',['jshint'], reload);   // watching for file changes
});