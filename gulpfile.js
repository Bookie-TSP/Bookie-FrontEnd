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

gulp.task('cloudScripts', function () {
	return gulp.src(['./node_modules/cloudinary-core/cloudinary-core.js',
				'./node_modules/cloudinary-jquery/cloudinary-jquery.js', './node_modules/cloudinary-jquery-file-upload/cloudinary-jquery-file-upload.js'])
		.pipe(concat('cloudScripts.js'))
		.pipe(gulp.dest('app/scripts'));
});

gulp.task('uploadScripts', function () {
	return gulp.src(['./node_modules/ng-file-upload/dist/ng-file-upload.js',
						'./node_modules/ng-file-upload/dist/ng-file-upload-shim.js'])
		.pipe(concat('uploadScripts.js'))
		.pipe(gulp.dest('app/scripts'));
});

gulp.task('default', ['scripts', 'styles', 'cloudScripts', 'uploadScripts'], function () {
	gulp.watch(['app/scripts/application.js', 'app/scripts/controllers/*.js', 'app/scripts/factories/*.js'], ['scripts']);
	gulp.watch(['app/styles/assets/*.css'], ['styles']);
	gulp.watch(['./node_modules/cloudinary-core/cloudinary-core.js',
				'./node_modules/cloudinary-jquery/cloudinary-jquery.js',
				'./node_modules/cloudinary-jquery-file-upload/cloudinary-jquery-file-upload.js'], ['cloudScripts']);
	gulp.watch(['./node_modules/ng-file-upload/dist/ng-file-upload.js',
						'./node_modules/ng-file-upload/dist/ng-file-upload-shim.js'],['uploadScripts']);
	browserSync.init({
		port: 8000,
		server: {
			baseDir: "./app"
		}
	});
});
