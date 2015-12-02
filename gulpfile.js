var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

gulp.task('sass', function () {
  return gulp.src('*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream());
});

gulp.task('js-watch', browserSync.reload);

gulp.task('serve', ['sass'], function () {
  browserSync.init({
    server: {
      baseDir: './',
      index: 'index.html'
    }
  });

  browserSync.watch('*.html').on('change', browserSync.reload);
  gulp.watch('*.scss', ['sass']);
  gulp.watch('*.js', ['js-watch']);
});

gulp.task('default', ['serve']);
