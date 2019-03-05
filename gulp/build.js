let gulp = require('gulp'),
  runSequence = require('run-sequence');


gulp.task('build:dev', () => {
  runSequence('clean', ['style', 'script', 'img', 'webserver']);
});

gulp.task('build:watch', () => {
  runSequence(['style:watch', 'script:watch', 'html:watch', 'server']);
});