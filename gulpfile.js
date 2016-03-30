var gulp = require('gulp'),
  concat = require('gulp-concat'),
  cssmin = require('gulp-cssmin'),
  del = require('del'),
  eslint = require('gulp-eslint'),
  eventStream = require('event-stream'),
  inject = require('gulp-inject'),
  less = require('gulp-less'),
  rename = require('gulp-rename'),
  replace = require('gulp-replace'),
  templateCache = require('gulp-angular-templatecache'),
  uglify = require('gulp-uglify'),
  webserver = require('gulp-webserver'),
  paths = require('./gulp.config.json');

/*******************************************[MAIN TASKS]******************************************/

/**
 * Build optimized app
 */
gulp.task('build', ['clean'], function () {
  return gulp.start('create-app');
});

/**
 * Serve dev environment with JS and less watcher
 */
gulp.task('serve', ['watch'], function() {
  gulp.src(paths.app)
    .pipe(webserver({
      open: true
    }));
});

/******************************************[HELPER TASKS]*****************************************/

/**
 * Remove dist directory
 */
gulp.task('clean', function () {
  return del(paths.dist);
});

/**
 * Create optimized app
 */
gulp.task('create-app', ['jsmin', 'cssmin', 'copy-fonts', 'copy-images'], function () {
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

/**
 * Minify and bundle JS files
 */
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

/**
 * Minify and bundle less files
 */
gulp.task('cssmin', function () {
  return gulp.src(paths.appLess)
    .pipe(less({
      'relative-urls': true
    }))
    .pipe(replace(/\.\.\/fonts\/glyphicons-([a-z-]+)\.([a-z]{2,5})/g, './fonts/glyphicons-$1.$2'))
    .pipe(replace(/\.\.\/fonts\/fontawesome-([a-z-]+)\.([a-z]{2,5})/g, './fonts/fontawesome-$1.$2'))
    .pipe(cssmin())
    .pipe(rename(paths.cssMinified))
    .pipe(gulp.dest(paths.dist));
});

/**
 * Copy fonts to dist directory
 */
gulp.task('copy-fonts', function () {
  return gulp.src(paths.fonts)
    .pipe(gulp.dest(paths.dist + 'fonts/'));
});

/**
 * Copy images to dist directory
 */
gulp.task('copy-images', function () {
  return gulp.src(paths.images)
    .pipe(gulp.dest(paths.dist + 'images/'));
});

/**
 * Watch JS and less file
 */
gulp.task('watch', ['lint'], function () {
  gulp.watch(paths.js, ['lint']);
  gulp.watch(paths.less, ['css']);
});

/**
 * Lint JS files using ESlint
 */
gulp.task('lint', function () {
  return gulp.src(paths.js)
    .pipe(eslint())
    .pipe(eslint.format());
});

/**
 * Compile less into css for dev server
 */
gulp.task('css', function () {
  return gulp.src(paths.appLess)
    .pipe(less({
      'relative-urls': true
    }))
    .pipe(replace(/\.\.\/fonts\/glyphicons-([a-z-]+)\.([a-z]{2,5})/g, './bower_components/bootstrap/fonts/glyphicons-$1.$2'))
    .pipe(replace(/\.\.\/fonts\/fontawesome-([a-z-]+)\.([a-z]{2,5})/g, './bower_components/font-awesome/fonts/fontawesome-$1.$2'))
    .pipe(gulp.dest(paths.app));
});
