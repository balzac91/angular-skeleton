var gulp = require('gulp'),
  eslint = require('gulp-eslint'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  clean = require('gulp-clean'),
  templateCache = require('gulp-angular-templatecache'),
  es = require('event-stream');

gulp.task('lint', function () {
  gulp.src('./app/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('watch', ['lint'], function () {
  gulp.watch(['./app/**/*.js'], ['lint']);
});

gulp.task('clean', function () {
  gulp.src('./dist/*')
    .pipe(clean());
});

gulp.task('jsmin', function () {
  var src = gulp.src(['./app/bower_components/angular/angular.min.js', './app/bower_components/angular-ui-router/release/angular-ui-router.min.js']);
  var src2 = gulp.src(['./app/**/*.js', '!./app/bower_components/**/*.js']);
  var src3 = gulp.src(['./app/**/*.html', '!./app/index.html', '!./bower_components/**/*.html'])
    .pipe(templateCache('templates.js', {
      module: 'app',
      root: './'
    }));

  es.merge(src, src2, src3)
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('build', ['clean', 'jsmin'], function () {
  gulp.src('./app/index.html')
    .pipe(gulp.dest('./dist/'));
});