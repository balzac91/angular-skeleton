var gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
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
  util = require('gulp-util'),
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
 * Serve dev environment with JS and less watchers
 */
gulp.task('serve', ['watch'], function () {
  gulp.src(paths.app)
    .pipe(webserver({
      open: true
    }));
});

/**
 * Print description
 */
gulp.task('default', function () {
  util.log();
  util.log(util.colors.bold.green('Available commands:'));
  util.log('-', util.colors.green('gulp build'), '- build optimized app, it creates dist directory with minified scripts and styles');
  util.log('-', util.colors.green('gulp serve'), '- serve dev environment with JS and less watchers');
  util.log();
});

/******************************************[HELPER TASKS]*****************************************/

var glyphiconsRegex = /\.\.\/fonts\/glyphicons-([a-z-]+)\.([a-z]{2,5})/g,
  fontAwesomeRegex = /\.\.\/fonts\/fontawesome-([a-z-]+)\.([a-z]{2,5})/g;

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
      }))
      .pipe(replace('./assets/images/', './images/'));

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
    .pipe(less())
    .pipe(replace(glyphiconsRegex, './fonts/glyphicons-$1.$2'))
    .pipe(replace(fontAwesomeRegex, './fonts/fontawesome-$1.$2'))
    .pipe(replace('../assets/images/', './images/'))
    .pipe(autoprefixer())
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
gulp.task('watch', ['lint', 'css'], function () {
  gulp.watch(paths.js, ['lint']);
  gulp.watch(paths.less, ['css']);
});

/**
 * Lint JS files using ESlint
 */
gulp.task('lint', function () {
  return gulp.src(paths.js)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.results(function (results) {
      if (results.errorCount === 0 && results.warningCount === 0) {
        util.log(util.colors.bold.green('ESlint test has been passed'));
      }
    }));
});

/**
 * Compile less into css for dev server
 */
gulp.task('css', function () {
  return gulp.src(paths.appLess)
    .pipe(less())
    .pipe(replace(glyphiconsRegex, './bower_components/bootstrap/fonts/glyphicons-$1.$2'))
    .pipe(replace(fontAwesomeRegex, './bower_components/font-awesome/fonts/fontawesome-$1.$2'))
    .pipe(autoprefixer())
    .pipe(gulp.dest(paths.app));
});
