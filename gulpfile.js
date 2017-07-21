const gulp = require('gulp');
const babel = require('gulp-babel');
var webpack = require('gulp-webpack');
var browserify = require('gulp-browserify');
var watch = require('gulp-watch');

gulp.task('default', () => {
    return watch('public/src/**.*', {ignoreInitial: false})
        .pipe(gulp.dest('js'));
});

gulp.task('js', () => {
    return gulp.src('public/src/main.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(browserify({
            insertGlobals: true,
            debug: !gulp.env.production
        }))
        .pipe(gulp.dest('public/javascripts/'));
});

