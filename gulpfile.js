var gulp = require('gulp'),
    runSequence = require('run-sequence'),//让gulp任务，可以相互独立，解除任务间的依赖，增强task复用
    browserSync = require('browser-sync').create(),//静态文件服务器，同时也支持浏览器自动刷新
    del = require('del'),//删除文件/文件夹
    compass = require('gulp-compass');
gulp.task('default', function () {
    return runSequence(['clean'],['build'],['serve','watch']);
});
gulp.task('clean', function (callback) {
    return del('./dist/',callback);
});
gulp.task('build', function (callback) {
    return runSequence(['compass','staticFiles'],callback);
});
gulp.task('compass', function () {
    return gulp.src('./src/**/*.scss')
        .pipe(compass({
            config_file:'./config.rb',
            css:'src/stylesheets',
            sass:'src/sass'
        }))
        .on('error',function(error){
            console.log(error);
            this.emit('end');
        })
        .pipe(gulp.dest('./dist/css'));
});
gulp.task('staticFiles', function () {
    return gulp.src([
        './src/**/*.html',
        './src/images*/**/*.*',
        './src/javascripts*/**/*.*'
    ])
        .pipe(gulp.dest('./dist/'));
});
gulp.task('serve', function () {
    browserSync.init({
        server:'./dist',
        port:8888
    });
});
gulp.task('reload', function () {
    return browserSync.reload();
});
gulp.task('watch', function () {
    return gulp.watch([
        './src/**/*.html',
        './src/**/*.scss'
    ], function () {
        return runSequence(['build'],['reload']);
    })
});
