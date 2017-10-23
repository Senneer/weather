'use strict';

const gulp = require('gulp'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
connect = require('gulp-connect'),
csscomb = require('gulp-csscomb'),
sass = require('gulp-sass'),
flexbugs = require('postcss-flexbugs-fixes'),
babel = require('gulp-babel'),
util = require('gulp-util');

//connect
gulp.task('connect', () => {
  connect.server({
    root: './app/',
    livereload: true,
    port: 8888
  });
});

//js
gulp.task('js', () => {
  return gulp.src('./js/*.js')
  .pipe(babel({
    presets: ['es2015']
  }))
  .on('error', function(e) {
    const message = e.message || '';
    const errName = e.name || '';
    const codeFrame = e.codeFrame || '';
    util.log(util.colors.red.bold('[JS babel error]')+' '+ util.colors.bgRed(errName));
    util.log(util.colors.bold('message:') +' '+ message);
    util.log(util.colors.bold('codeframe:') + '\n' + codeFrame);
    this.emit('end');
  })
  .pipe(gulp.dest('./app/js/'))
  .pipe(connect.reload());
});

//css
gulp.task('css', () => {
  const processors = [autoprefixer({browsers: ['last 3 version', 'ie 10', 'ie 11']}), flexbugs];
  return gulp.src('./scss/main.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(postcss(processors))
  .pipe(csscomb())
  .pipe(gulp.dest('./app/css/'))
  .pipe(connect.reload());
});

//html
gulp.task('html', () => {
  return gulp.src('./app/index.html')
  .pipe(connect.reload());
});

//watch
gulp.task('watch', () => {
  gulp.watch('./js/*.js', ['js']);
  gulp.watch('./scss/*.scss', ['css']);
  gulp.watch('./app/index.html', ['html']);
});

//default
gulp.task('default', ['connect', 'js', 'html', 'css', 'watch']);