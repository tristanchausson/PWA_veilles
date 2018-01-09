var gulp    = require('gulp'),
sass        = require('gulp-sass'),
minifyCss   = require('gulp-clean-css'),
uglify      = require('gulp-uglify'),
browserSync = require('browser-sync').create(),
merge       = require('merge-stream'),
reload      = browserSync.reload;

// Commands
gulp.task('watch', ['browserSync', 'style', 'script', 'sass', 'js'], function() {
    gulp.watch('assets/scss/*.scss', ['sass']).on('change', reload)
    gulp.watch('assets/js/*.js', ['js']).on('change', reload)
    gulp.watch("./*.html").on('change', reload)
})
gulp.task('build', ['style', 'script', 'minify-css', 'uglify'])
gulp.task('default', ['watch'])

// Dev Watch
gulp.task('browserSync', function() {
    browserSync.init({
        server:'./'
    })
})
gulp.task('style', function() {
    gulp.src('./node_modules/materialize-css/dist/css/*.min.css')
        .pipe(gulp.dest('./dist/css'))
})
gulp.task('script', function() {
    var materialize = gulp.src('./node_modules/materialize-css/dist/js/materialize.min.js')
                            .pipe(gulp.dest('./dist/js'))
    var jquery      = gulp.src('./node_modules/jquery/dist/jquery.min.js')
                            .pipe(gulp.dest('./dist/js'))
    return merge(materialize, jquery)
})
gulp.task('sass', function() {
    return gulp.src('assets/scss/main.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/css/'))
})
gulp.task('js', function() {
    gulp.src('assets/js/main.js')
    .pipe(gulp.dest('dist/js/'))
})

// Build
gulp.task('minify-css', function() {
    return gulp.src('assets/scss/main.scss')
        .pipe(sass())
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css/'))
})
gulp.task('uglify', function() {
    gulp.src('assets/js/main.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/'))
})
