const {parallel, src, dest} = require('gulp');
const cleanCss = require('gulp-clean-css');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const replace = require('gulp-replace');
const livereload = require('gulp-livereload');

const minifiedJs = 'index.min.js';
const minifiedCss = 'styles.min.css';

function javascript() {
    return src(['src/client/js/device.js', 'src/client/js/themes.js', 'src/client/js/utils.js', 'src/client/js/spotify.js', 'src/client/js/app.js'])
        .pipe(replace(`./images/generic-album.png`, `./static/generic-album.png`))
        .pipe(concat(minifiedJs))
        .pipe(terser())
        .pipe(dest('src/server/public'));
}

function css() {
    return src('src/client/css/*.css')
        .pipe(concat(minifiedCss))
        .pipe(replace(`../fonts/`, `static/`))
        .pipe(cleanCss({debug: true}, (details) => {
            console.log(`Original CSS size: ${details.stats.originalSize}`);
            console.log(`Minified CSS Size: ${details.stats.minifiedSize}`);
        }))
        .pipe(dest('src/server/public'));
}

function html() {
    return src('src/client/index.html')
        .pipe(replace(`js/app.js`, `${minifiedJs}`))
        .pipe(replace(`css/main.css`, `${minifiedCss}`))
        .pipe(replace(`images/bxRadio_mark.ico`, `static/bxRadio_mark.ico`))
        .pipe(dest('src/server/public'));
}

function copyStaticFiles() {
    return src(['src/client/fonts/*.woff', 'src/client/images/*']).pipe(dest('src/server/public/static'));
}


exports.build = parallel(javascript, css, html, copyStaticFiles);