var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    minifyHTML = require('gulp-minify-html'),
    uglify = require('gulp-uglify'),
    path = require('path'),
    concatCss = require('gulp-concat-css'),
    autoprefix = require('gulp-autoprefixer'),
    minifyCss = require('gulp-minify-css'),
    less = require('gulp-less'),
    jshint = require('gulp-jshint');


// default gulp task
gulp.task('default', ['jshint','minify-html', 'less'], function() {
    gulp.watch('./src/less/*.less', ['less']);   // watching for file changes
    gulp.watch('./src/html/*.html', ['minify-html']);   // watching for file changes
    gulp.watch('./src/js/*.js',['jshint']);   // watching for file changes
});


gulp.task('start', function () {
    nodemon({ script: 'server.js',
            ext: 'html js less',
            ignore: ['node_modules/**', 'Public'],
            tasks: ['jshint','minify-html','less']
             })
    .on('restart', function () {
      setTimeout(function() {
            require('fs').writeFileSync('.rebooted', 'rebooted');
          }, 6000);
    })
    .on('start', function () {
      console.log('started Woodscamp Project Server!');
    })
})

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
    return gulp.src('./src/index.html')
      .pipe(minifyHTML(opts))
      .pipe(gulp.dest('./dist/'));
});

gulp.task('less', ['styles', 'bootstrap']);

gulp.task('less:test', function() {
    return gulp.src('./src/less/main.less')
      .pipe(less({ paths: [path.join(__dirname, 'less', 'includes')] }))
      .pipe(gulp.dest('./src/css'));
});

gulp.task('bootstrap', function() {
    gulp.src(['./src/css/bootstrap.min.css'])
      .pipe(concatCss("bootstrap.min.css"))
      .pipe(gulp.dest('./dist/css')); //
});

gulp.task('styles', function() {
    gulp.src(['./src/css/*.css'])
      .pipe(minifyCss({compatibility: 'ie8'}))
      .pipe(concatCss("styles.css"))
      .pipe(gulp.dest('./dist/css')); //
});