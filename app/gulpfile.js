var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('scripts', function() {
  return gulp.src(['./config/config.local.js', './js/connect.js', './js/app.js'])
  .pipe(concat('scripts.js'))
  .pipe(gulp.dest('./dist/js'));
});

gulp.task('watch', function() {
  gulp.watch('./**/*.js', ['scripts']);
});

gulp.task('default', ['scripts', 'watch']);
