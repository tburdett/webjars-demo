// destination directory could be...
// ${project.build.outputDirectory}/META-INF/resources/webjars/${project.artifactId}/${project.version}
// ...if executing from maven
// Alternatively, configuration can go here!

"use strict";

var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var mbf = require('main-bower-files');
var concat = require('gulp-concat');
var del = require('del');
var runSequence = require('run-sequence');

var TARGET = 'target/classes/META-INF/resources/webjars/js-lib/0.0.1-SNAPSHOT/';

gulp.task('clean', function() {
    del(TARGET);
});

gulp.task('download', function() {
    return gulp.src(mbf())
            .pipe(uglify())
            .pipe(rename({extname: '.min.js'}))
            .pipe(gulp.dest(TARGET));
});

gulp.task('package-libraries', function() {
    return gulp.src(mbf())
            .pipe(concat('vendor.js'))
            .pipe(uglify())
            .pipe(rename({extname: '.min.js'}))
            .pipe(gulp.dest(TARGET));
});

gulp.task('package-js', function() {
    return gulp.src('src/main/javascript/*.js')
            .pipe(uglify())
            .pipe(rename({extname: '.min.js'}))
            .pipe(gulp.dest(TARGET));
});

gulp.task('install', function(callback) {
    return runSequence(
            'clean',
            'package-libraries',
            'package-js',
            function(error) {
                if (error) {
                    console.log(error.message);
                }
                else {
                    console.log('INSTALL COMPLETE');
                }
                callback(error);
            });
});