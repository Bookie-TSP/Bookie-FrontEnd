var gulp = require('gulp');
var concat = require('gulp-concat');
var concatCss = require('gulp-concat-css');
var server = require( 'gulp-develop-server' );
var browserSync = require('browser-sync').create();

gulp.task('scripts', function() {
  return gulp.src(['./scripts/application.js', './scripts/controllers/*.js'])
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('./scripts/'));
});

gulp.task('styles', function() {
  return gulp.src(['./styles/assets/*.css'])
    .pipe(concatCss('styles.css'))
    .pipe(gulp.dest('./styles/'));
});

gulp.task('default', ['scripts', 'styles'], function() {
    gulp.watch(['./scripts/application.js', './scripts/controllers/*.js'], ['scripts']);
    gulp.watch(['./styles/assets/*.css'], ['styles']);
    browserSync.init({
        port: 8000,
        server: {
            baseDir: "./app"
        }
    });
});
