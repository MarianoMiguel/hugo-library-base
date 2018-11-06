const gulp = require('gulp'),
      sass = require('gulp-sass'),
      postcss = require('gulp-postcss'),
      autoprefixer = require('autoprefixer'),
      pxtorem = require('postcss-pxtorem'),
      concat = require('gulp-concat'),
      cssnano = require('cssnano'),
      gulpStylelint = require('gulp-stylelint'),
      uglify = require('gulp-uglify-es').default,
      path = require('path');

/**
 * Lint and compile CSS
 */

gulp.task('lint-styles', function() {
    return gulp.src("./static/scss/**/*.scss")
    .pipe(gulpStylelint({
      failAfterError: false,
      reportOutputDir: 'reports/lint',
      reporters: [
        { formatter: 'verbose', console: true }
      ],
      debug: true
    }));
});

gulp.task('css', ['lint-styles'], function() {

  var processors = [
    autoprefixer({
        browsers: ['last 2 version', 'ie 10']
    }),
    pxtorem({
        replace: true,
        propList: ['font', 'font-size', 'line-height', 'letter-spacing', 'margin', 'margin-left', 'margin-right', 'margin-top', 'margin-bottom', 'padding', 'padding-left', 'padding-right', 'padding-top', 'padding-bottom', 'border-radius', 'border-top-left-radius', 'border-bottom-left-radius', 'border-top-right-radius', 'border-bottom-right-radius', 'left', 'right', 'top', 'bottom', 'transform', 'box-shadow', 'text-shadow', 'background-position', 'width', 'max-width', 'height', 'max-height'],
    }),
    cssnano({ minifyFontValues: false, discardUnused: false })
  ];

  gulp.src('./static/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(gulp.dest('./static/css/'));
});

/**
 * Bundle & minify JS
 */


gulp.task('js', () => {
  gulp.src('./static/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./static/js/dist/'));
});

/**
 * Watch
 */

gulp.task('watch', () => {
  // Watch .scss files
  gulp.watch('./static/scss/**/*.scss', ['css']);
  // Watch .js files
  gulp.watch('./static/js/**/*.js', ['js']);
});

gulp.task('default', () => {
  gulp.start('watch');
});

