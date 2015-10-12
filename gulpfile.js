var gulp = require('gulp');
var concat = require('gulp-concat');
var concatCss = require('gulp-concat-css');
var browserSync = require('browser-sync').create();

gulp.task('scripts', function() {
  return gulp.src(['app/scripts/application.js', 'app/scripts/controllers/*.js', 'app/scripts/factories/*.js'])
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('app/scripts/'));
});

gulp.task('styles', function() {
  return gulp.src(['app/styles/assets/*.css'])
    .pipe(concatCss('styles.css'))
    .pipe(gulp.dest('app/styles/'));
});

gulp.task('default', ['scripts', 'styles'], function() {
    gulp.watch(['app/scripts/application.js', 'app/scripts/controllers/*.js', 'app/scripts/factories/*.js'], ['scripts']);
    gulp.watch(['app/styles/assets/*.css'], ['styles']);
    browserSync.init({
        port: 8000,
        server: {
            baseDir: "./app"
        }
    });
});
