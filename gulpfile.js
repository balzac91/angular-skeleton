var gulp = require('gulp'),
  eslint = require('gulp-eslint'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  less = require('gulp-less'),
  cssmin = require('gulp-cssmin'),
  templateCache = require('gulp-angular-templatecache'),
  inject = require('gulp-inject'),
  eventStream = require('event-stream'),
  rename = require('gulp-rename'),
  del = require('del');

gulp.task('lint', function () {
  return gulp.src('./app/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('watch', ['lint'], function () {
  gulp.watch(['./app/**/*.js'], ['lint']);
});

gulp.task('clean', function () {
  return del('./dist');
});

gulp.task('fonts', function () {
  return gulp.src('./app/bower_components/bootstrap/fonts/*.*')
    .pipe(gulp.dest('./dist/fonts/'));
});

gulp.task('cssmin', function () {
  return gulp.src('./app/css/app.less')
    .pipe(less({
      'relative-urls': true
    }))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('jsmin', function () {
  var bowerComponents = gulp.src(['./app/bower_components/angular/angular.min.js',
    './app/bower_components/angular-ui-router/release/angular-ui-router.min.js',
      './app/bower_components/jquery/dist/jquery.min.js',
    './app/bower_components/bootstrap/dist/js/bootstrap.min.js']),
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

gulp.task('create-app', ['jsmin', 'cssmin', 'fonts'], function () {
  var jsSrc = gulp.src('./dist/app.min.js', {
    read: false
  });

  var cssSrc = gulp.src('./dist/app.min.css', {
    read: false
  });

  return gulp.src('./app/index.html')
    .pipe(inject(jsSrc, {
      ignorePath: 'dist',
      addRootSlash: false
    }))
    .pipe(inject(cssSrc, {
      ignorePath: 'dist',
      addRootSlash: false
    }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('build', ['clean'], function () {
  return gulp.start('create-app');
});