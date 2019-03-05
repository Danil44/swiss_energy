const gulp        = require('gulp');
const {config} = require('../package.json');
const browserSync = require('browser-sync').create();

// Static server
gulp.task('server', function() {
  browserSync.init({
    server: {
      open: false,
      browser: 'google chrome',
      baseDir: config.build.html
    }
  });

  gulp.watch(['./*.html', './static/css/*.css']).on('change', browserSync.reload);
});