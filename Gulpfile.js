"use strict";

var gulp          = require('gulp');
var browserSync   = require('browser-sync').create();
var sass          = require('gulp-sass');
var rename        = require('gulp-rename');
var concat        = require('gulp-concat');
var stripDebug    = require('gulp-strip-debug');
var uglify        = require('gulp-uglify');
var notify        = require('gulp-notify');
var autoprefixer  = require('gulp-autoprefixer');
var minifycss     = require('gulp-minify-css');
var modernizr     = require('gulp-modernizr');
var nunjucksRender = require('gulp-nunjucks-render');

// Compile sass into CSS & auto-inject into browsers
function css() {
  return gulp
    .src("src/scss/*.scss")
    .pipe( sass() )
    .on('error', function (err) {
      console.log(err.toString());
      this.emit('end');
    })
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest("build/css"))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('build/css'))
    .pipe(notify({ message: 'SASS Compiled' }))
    .pipe(browserSync.stream());
}


// Task to concat, strip debugging and minify JS files
function js() {
  return gulp
    .src(['src/js/**/*.js'])
    .pipe(concat('app.js'))
    // .pipe(stripDebug()) // uncomment this line to strip JS comments
    .pipe(uglify())
    .pipe(gulp.dest('build/js'))
    .pipe(notify({ message: 'JS Compiled' }))
    .pipe(browserSync.stream());
}


// Nunjucks
function nunjucks() {
  // Gets .html and .nunjucks files in pages
  return gulp.src('pages/**/*.+(html|nunjucks)')
  // Renders template with nunjucks
  .pipe(nunjucksRender({
    path: ['templates']
  }))
  // output files in root folder
  .pipe(gulp.dest('./'))
  .pipe(notify({ message: 'Nunjucks Compiled' }))
  
}


// Modernizr
// gulp.task('modernizr', function() {
//   var settings = {
//     "cache" : true,
//     "options" : [
//       "setClasses"
//     ]
//   };
//   return gulp.src(['src/js/**/*.js', 'src/scss/**/*.scss'])
//     .pipe(modernizr( 'modernizr-custom.js', settings))
//     .pipe(gulp.dest("build/js/vendor"))
// });

// Watching scss/html files
function watchFiles() {
  gulp.watch("src/scss/**/*.scss", gulp.series('css','browserSyncReload'));
  gulp.watch("src/js/**/*.js", gulp.series('js','browserSyncReload'));
  gulp.watch(["pages/*.html","templates/**/*.html"], gulp.series('nunjucks','browserSyncReload'));
}

// BrowserSync static server
function browserSyncServer(done) {
  browserSync.init({
    server: {
      baseDir: "./"
    },
    port: 3000
  });
  done();
}

// BrowserSync Reload
function browserSyncReload(done) {
  browserSync.reload();
  done();
}

gulp.task("css", css);

gulp.task("js", js);

gulp.task("nunjucks", nunjucks);

gulp.task("browserSyncReload", browserSyncReload);

gulp.task("watchFiles", watchFiles);

gulp.task("browserSyncServer", browserSyncServer);

gulp.task("watch", gulp.parallel(watchFiles, browserSyncServer));

gulp.task('default', gulp.parallel(watchFiles, browserSyncServer));