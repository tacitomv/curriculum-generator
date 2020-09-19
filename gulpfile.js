const { src, dest, series, parallel, watch } = require('gulp');

const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const rename = require("gulp-rename");

// Compile SCSS
function css() {
    return src('./scss/**/*.scss')
        .pipe(sass.sync({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(dest('.'))
}

// Minify CSS
function minify() {
    return src([
        './*.css',
        '!./*.min.css'
    ])
        .pipe(cleanCSS())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(dest('.'));
}

// Dev task
function watchFiles() {
    watch('./scss/*.scss', series(css, minify));
}

exports.default = series(css, minify);
exports.watch = watchFiles;