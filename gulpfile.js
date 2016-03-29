var gulp = require('gulp'),
  eslint = require('gulp-eslint'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  less = require('gulp-less'),
  cssmin = require('gulp-cssmin'),
  templateCache = require('gulp-angular-templatecache'),
  inject = require('gulp-inject'),
  webserver = require('gulp-webserver'),
  eventStream = require('event-stream'),
  rename = require('gulp-rename'),
  del = require('del'),
  paths = require('./gulp.config.json');

gulp.task('clean', function () {
  return del(paths.dist);
});

gulp.task('fonts', function () {
  return gulp.src(paths.fonts)
    .pipe(gulp.dest(paths.dist + 'fonts/'));
});

gulp.task('images', function () {
  return gulp.src(paths.images)
    .pipe(gulp.dest(paths.dist + 'images/'));
});

gulp.task('cssmin', function () {
  return gulp.src(paths.appLess)
    .pipe(less({
      'relative-urls': true
    }))
    .pipe(cssmin())
    .pipe(rename(paths.cssMinified))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('jsmin', function () {
  var bowerComponents = gulp.src(paths.vendorJs),
    sources = gulp.src(paths.js),
    templates = gulp.src(paths.html)
      .pipe(templateCache('templates.js', {
        module: 'app',
        root: './'
      }));

  return eventStream.merge(bowerComponents, sources, templates)
    .pipe(concat(paths.jsMinified))
    .pipe(uglify())
    .pipe(gulp.dest(paths.dist));
});

gulp.task('create-app', ['jsmin', 'cssmin', 'fonts', 'images'], function () {
  var jsSrc = gulp.src(paths.dist + paths.jsMinified, {
    read: false
  });

  var cssSrc = gulp.src(paths.dist + paths.cssMinified, {
    read: false
  });

  return gulp.src(paths.app + 'index.html')
    .pipe(inject(jsSrc, {
      ignorePath: paths.dist.substring(1),
      addRootSlash: false
    }))
    .pipe(inject(cssSrc, {
      ignorePath: paths.dist.substring(1),
      addRootSlash: false
    }))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('build', ['clean'], function () {
  return gulp.start('create-app');
});

gulp.task('css', function () {
  return gulp.src(paths.less)
    .pipe(less({
      'relative-urls': true
    }))
    .pipe(gulp.dest(paths.app));
});

gulp.task('lint', function () {
  return gulp.src(paths.js)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('watch', ['lint'], function () {
  gulp.watch(paths.js, ['lint']);
  gulp.watch(paths.less, ['css']);
});

gulp.task('serve', ['watch'], function() {
  gulp.src(paths.app)
    .pipe(webserver({
      open: true
    }));
});