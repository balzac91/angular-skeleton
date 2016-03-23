var gulp = require('gulp'),
  eslint = require('gulp-eslint');

gulp.task('lint', function () {
  gulp.src('./app/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('watch', ['lint'], function () {
  gulp.watch(['./app/**/*.js'], ['lint']);
});