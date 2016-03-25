var gulp = require('gulp'),
  eslint = require('gulp-eslint'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  clean = require('gulp-clean'),
  templateCache = require('gulp-angular-templatecache'),
  inject = require('gulp-inject'),
  eventStream = require('event-stream');

gulp.task('lint', function () {
  return gulp.src('./app/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('watch', ['lint'], function () {
  gulp.watch(['./app/**/*.js'], ['lint']);
});

gulp.task('clean', function () {
  return gulp.src('./dist/*')
    .pipe(clean());
});

gulp.task('jsmin', function () {
  var bowerComponents = gulp.src(['./app/bower_components/angular/angular.min.js', './app/bower_components/angular-ui-router/release/angular-ui-router.min.js']),
    sources = gulp.src(['./app/**/*.js', '!./app/bower_components/**/*.js']),
    templates = gulp.src(['./app/**/*.html', '!./app/index.html', '!./bower_components/**/*.html'])
      .pipe(templateCache('templates.js', {
        module: 'app',
        root: './'
      }));

  return eventStream.merge(bowerComponents, sources, templates)
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('build', ['clean', 'jsmin'], function () {
  var appSrc = gulp.src('./dist/app.min.js', {
    read: false
  });

  return gulp.src('./app/index.html')
    .pipe(inject(appSrc, {
      ignorePath: 'dist',
      addRootSlash: false
    }))
    .pipe(gulp.dest('./dist/'));
});