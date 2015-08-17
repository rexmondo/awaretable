var gulp = require('gulp')
  , sourcemaps = require('gulp-sourcemaps')
  , babel = require('gulp-babel')
  , concat = require('gulp-concat')
  , sass = require('gulp-sass');

gulp.task('default', function () {
  gulp.watch('./src/scss/**', ['sass', 'sass-dev']);
  gulp.watch('./src/js/*.jsx', ['babel']);
});

gulp.task('sass', function() {
  gulp.src('./src/scss/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./app/css/'));
});

gulp.task('sass-dev', function() {
  gulp.src('./src/scss/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./src/css/'));
});

gulp.task('babel', function () {
  var path = 'src/js/';
  return gulp.src([path + '*.jsx', path + 'Main.jsx'])
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('Main.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('app/js/'));
});
