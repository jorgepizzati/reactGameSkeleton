// ==============================================
// 	File: gulpfile.js
// 	Developer: 
// 		Jorge Pizzati 	jpizzati@sanservices.hn
// 	Description:
//  Compiling, minification, optimization and live reload.
//
// ==============================================

// Include gulp
var gulp = require('gulp');
 // Define base folders
var src = './src';
var dest = './build';
 // Include plugins
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var browserSync = require('browser-sync').create();


gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

 // Concatenate & Minify JS
gulp.task('scripts', function() {
	return gulp.src(src + '/js/*.js')
    	.pipe(concat('main.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(dest + 'js'));
});

 // Compile CSS from Sass files
gulp.task('sass', function () {
	return gulp.src(src + '/sass/**/*.scss')
    	.pipe(sass.sync().on('error', sass.logError))
    	.pipe(gulp.dest(dest + '/css'))
    	.pipe(browserSync.stream());
});

// Optimize Images
gulp.task('images', function() {
  return gulp.src(src + '/images/**/*')
  	.pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
  	.pipe(gulp.dest(dest + '/img'));
});

 // Watch for changes in files
gulp.task('watch', function() {
	gulp.watch(src + '/js/*.js', ['scripts']);
	gulp.watch(src + '/sass/**/*.scss', ['sass']);
 	gulp.watch(src + '/images/**/*', ['images']);
 });

 // Default Task
gulp.task('default', ['scripts', 'sass', 'images', 'watch', 'browserSync']);