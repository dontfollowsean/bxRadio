const {parallel, src, dest} = require('gulp');
const cleanCss = require('gulp-clean-css');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const replace = require('gulp-replace');

const minifiedJs = 'index.min.js';
const minifiedCss = 'styles.min.css';

function javascript() {
    return src('src/js/*.js')
        .pipe(concat(minifiedJs))
        .pipe(terser())
        .pipe(dest('dist'));
}

function css() {
    return src('src/css/*.css')
        .pipe(concat(minifiedCss))
        .pipe(cleanCss({debug: true}, (details) => {
            console.log(`Original CSS size: ${details.stats.originalSize}`);
            console.log(`Minified CSS Size: ${details.stats.minifiedSize}`);
        }))
        .pipe(dest('dist'));
}

function html() {
    return src('src/index.html')
        .pipe(replace(`./js/app.js`,`${minifiedJs}`))
        .pipe(replace(`./css/main.css`, `${minifiedCss}`))
        .pipe(dest('dist'));
}

function copyStaticFiles() {

}


exports.build = parallel(javascript, css, html);