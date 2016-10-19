var gulp = require('gulp');
var less = require('gulp-less');
var cssmin = require('gulp-clean-css');
var rename = require('gulp-rename');
var contact = require('gulp-concat');
var browserSync = require('browser-sync').create();


var dist = {
  less: 'dist/assets/less/*.less',
  css: 'dist/assets/css/',
  js: 'dist/assets/js/*.js',
  images: 'dist/assets/images/*',
  html: 'dist/html/*.html',
  index: 'dist/index.html'
};

var dest = {
  css: 'dest/assets/css/',
  js: 'dest/assets/js/',
  images: 'dest/assets/images',
  html: 'dest/html/',
  index: 'dest/'
};

//编译dist/assets/less文件并压缩
gulp.task('css',function(){
  return gulp.src(dist.less)
    .pipe(less())
    .pipe(cssmin())
    .pipe(rename({suffix:'.min'}))
    .pipe(gulp.dest(dest.css))
    .pipe(gulp.dest(dist.css));
});


gulp.task('html',function(){
  return gulp.src(dist.html)
    .pipe(gulp.dest(dest.html));
});


gulp.task('watch',function(){
  gulp.watch(dist.less,['css']);
});

gulp.task('default',function(){
  gulp.start('browserSync');
});

gulp.task('browserSync',['watch'], function() {
    browserSync.init({
        server: {
            baseDir: "./",
        },
        files: [ 'dist/*','dist/html/*', 'docs/*']
    });
});
