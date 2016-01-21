var gulp = require('gulp'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    cssmin = require('gulp-cssnano');
 
gulp.task('less', function () {
    gulp.src(['src/less/app.less','src/less/admin.less'])
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cssmin())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('watch', function () {
    gulp.watch('src/less/**.less', ['less'])
});