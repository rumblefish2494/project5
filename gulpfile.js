var gulp = require('gulp');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');

gulp.task('default', function(){

});

//default code needs to be filled in!!!
gulp.task('lint', function() {
  return gulp.src('js/*.js')
    .pipe(uglify())
    .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function() {
	return gulp.src('js/app.js')
		.pipe(rename('app.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
});

gulp.task('default', ['lint', 'scripts']);