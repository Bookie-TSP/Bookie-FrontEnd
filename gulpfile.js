var gulp = require('gulp');
var concat = require('gulp-concat');
var concatCss = require('gulp-concat-css');
var browserSync = require('browser-sync')
	.create();

gulp.task('scripts', function () {
	return gulp.src(['app/scripts/application.js', 'app/scripts/controllers/*.js', 'app/scripts/factories/*.js'])
		.pipe(concat('scripts.js'))
		.pipe(gulp.dest('app/scripts/'));
});

gulp.task('styles', function () {
	return gulp.src(['app/styles/assets/*.css'])
		.pipe(concatCss('styles.css'))
		.pipe(gulp.dest('app/styles/'));
});

gulp.task('libaryScripts', function () {
	return gulp.src(['./bower_components/angular/angular.js',
						'./bower_components/jquery/dist/jquery.min.js',
						'./bower_components/jquery-ui/jquery-ui.min.js',
						'./bower_components/jQuery.dotdotdot/src/js/jquery.dotdotdot.min.js',
						'./bower_components/angular-google-maps/dist/angular-google-maps.min.js',
						'./bower_components/angular-simple-logger/dist/angular-simple-logger.min.js',
						'./bower_components/loadash/loadash.min.js',
						'./bower_components/bootstrap/dist/js/bootstrap.min.js',
						'./bower_components/angular-ui-router/release/angular-ui-router.min.js',
						'./bower_components/ngstorage/ngStorage.min.js',
						'./bower_components/ng-file-upload/ng-file-upload-shim.js',
						'./bower_components/ng-file-upload/ng-file-upload.js',
						'./bower_components/cloudinary_ng/js/angular.cloudinary.js',
						'./bower_components/cloudinary_js/js/jquery.cloudinary.js'
					])
		.pipe(concat('libary.js'))
		.pipe(gulp.dest('app/scripts'));
});

gulp.task('default', ['scripts', 'styles', 'libaryScripts'], function () {
	gulp.watch(['app/scripts/application.js', 'app/scripts/controllers/*.js', 'app/scripts/factories/*.js'], ['scripts']);
	gulp.watch(['app/styles/assets/*.css'], ['styles']);
	browserSync.init({
		port: 8000,
		server: {
			baseDir: "./app"
		}
	});
});
