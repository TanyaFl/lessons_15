'use strict';

const gulp = require('gulp');
const csso = require('gulp-csso');
const clean = require('gulp-clean');
const htmlmin = require('gulp-htmlmin');
const connect = require('gulp-connect');
const less = require('gulp-less');
const uglify = require('gulp-uglify');
const dist = './dist/';

gulp.task('clean', () =>gulp.src(dist)
            .pipe(clean({ force: true }))
            .pipe(gulp.dest(dist))
);

gulp.task('styles', () => gulp.src('./styles.less')
        .pipe(less({}))
        .pipe(csso())
        .pipe(gulp.dest(dist))
);

gulp.task('scripts', () => gulp.src('./index.js')
        .pipe(uglify())
        .pipe(gulp.dest(dist))
);

gulp.task('html-min', () =>gulp.src('./index.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
          }))
        .pipe(gulp.dest(dist))
    );

gulp.task('connect', () => connect.server({
    port: 3444,
    root: 'dist',
}));

gulp.task('build', gulp.series(['styles', 'scripts', 'html-min']));