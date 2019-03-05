const gulp = require('gulp'),
  { config } = require('../package.json');
let notify = require('gulp-notify');
let plumber = require('gulp-plumber');
let fileinclude = require('gulp-file-include');

gulp.task('html', () => {
  return gulp.src(config.src.html)
    .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(config.build.html));
});

gulp.task('html:watch', ['html'], () => {
  gulp.watch([config.src.html, [ 'src/html/**/*.html']], ['html']);
});
