var gulp = require('gulp'),
  eslint = require('gulp-eslint');

gulp.task('default', function () {
  console.log('gulp');
});

gulp.task('lint', function() {
  gulp.src('./app/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format());
});