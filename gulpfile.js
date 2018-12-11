const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const cleanCss = require('gulp-clean-css');

const jsPath = './assets/js/**/*.js';
const cssPath = './assets/**/*.(css|scss)';

function processJs() {
  return gulp.src(jsPath)
    .pipe(babel({ presets: ['@babel/preset-env'] }))
    .pipe(uglify())
    .pipe(gulp.dest('./public/javascripts'))
}

gulp.task('processJs', processJs);

function processCss() {
  return gulp.src(cssPath)
    .pipe(sass())
    .pipe(cleanCss())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./public/stylesheets'))
}

gulp.task('processCss', processCss);

gulp.task('watch', () => {
  gulp.watch(jsPath).on('change', processJs);
  gulp.watch(cssPath).on('change', processCss);
});
