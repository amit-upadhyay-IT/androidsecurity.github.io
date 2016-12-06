var gulp            = require('gulp');
var autoprefixer    = require('gulp-autoprefixer');
var gutil           = require('gulp-util');
var imagemin        = require('gulp-imagemin');
var pngquant        = require('imagemin-pngquant');

var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
        .on('close', done);
});

// Creates optimized versions of images,
// then outputs to appropriate location(s)
gulp.task('images', function () {
    return gulp.src('images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('images'));
});

// Watch files
gulp.task('watch', function () {
    gulp.watch(['images/*']);
});

gulp.task('default', ['images', 'watch'])