var gulp = require('gulp'),
  eslint = require('gulp-eslint'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify');

gulp.task('lint', function () {
  gulp.src('./app/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('watch', ['lint'], function () {
  gulp.watch(['./app/**/*.js'], ['lint']);
});

gulp.task('min', function () {
  gulp.src('./app/**/*.js')
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'));
});