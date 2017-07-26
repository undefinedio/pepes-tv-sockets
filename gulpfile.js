const gulp = require('gulp');
const babel = require('gulp-babel');
var webpack = require('gulp-webpack');
var browserify = require('gulp-browserify');
var es2015 = require('babel-preset-es2015');
var watch = require('gulp-watch');

gulp.task('watch', function () {
    watch('public/src/**/*.js', function () {
        gulp.start('js');
    });

});

gulp.task('js', () => {
    return gulp.src('public/src/main.js')
        .pipe(babel({
            presets: [es2015]
        }))
        .pipe(browserify({
            insertGlobals: true,
            debug: !gulp.env.production
        }))
        .pipe(gulp.dest('public/javascripts/'));
});

gulp.task('default', ['js', 'watch']);


