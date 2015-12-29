var gulp        = require('gulp');
var rimraf      = require('rimraf');
var uglify      = require('gulp-uglifyjs');
var minifyCss   = require('gulp-minify-css');
var rename      = require('gulp-rename');
var connect     = require('gulp-connect');
var sass        = require('gulp-sass');
var sequence    = require('run-sequence');

/**
 * $ gulp clean
 * clean the build folder.
 */
gulp.task('clean', function(cb) {
  rimraf('./build', cb);
});

/**
 * $ gulp html
 * copy html files from src to build folder.
 */
gulp.task('html', function(){
    gulp.src('src/**/*.html')
        .pipe(gulp.dest('build'))
        .pipe(connect.reload());
});

/**
 * $ gulp js
 * copy and compress javascript files to build/js folder.
 */
gulp.task('js', function(){
    gulp.src(['src/js/popcollection.js', 'src/js/*.js'])
        .pipe(uglify())
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest('build/js/'))
        .pipe(connect.reload());
});

/**
 * $ gulp sass
 * compile sass, compress and copy to build/css folder.
 */
gulp.task('sass', function() {
    gulp.src('src/scss/*.scss')
        .pipe(sass())
        .pipe(minifyCss())
        .pipe(rename('app.min.css'))
        .pipe(gulp.dest('build/css/'));
});

/**
 * $ gulp resource
 * copy all resources to build/resource folder.
 */
gulp.task('resource', function() {
    gulp.src('resource/**/*')
        .pipe(gulp.dest('build/resource'));
});

/**
 * $ gulp serve
 * run a web server with live reload based on build folder
 */
gulp.task('serve', ['build'], function() {
    connect.server({
        root: 'build',
        livereload: true
    });
});

/**
 * $ gulp build
 * build all tasks
 */
gulp.task('build', function(cb) {
    sequence('clean', ['html','js','sass','resource'], cb);
});

/**
 * $ gulp
 * a default task to start a web server and watch src if change.
 */
gulp.task('default', ['serve'], function() {
  gulp.watch(['./src/scss/**/*'], ['sass']);
  gulp.watch(['./src/js/**/*'], ['js']);
  gulp.watch(['./src/**/*.html'], ['html']);
});
