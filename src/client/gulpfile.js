const {parallel, series, src, dest, watch} = require('gulp');
const cleanCss = require('gulp-clean-css');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const replace = require('gulp-replace');
const browserSync = require('browser-sync').create();

const minifiedJs = 'index.min.js';
const minifiedCss = 'styles.min.css';

function javascript() {
    return src(['./js/device.js', './js/themes.js', './js/utils.js', './js/spotify.js', './js/app.js'])
        .pipe(replace(`./images/generic-album.png`, `./static/generic-album.png`))
        .pipe(concat(minifiedJs))
        .pipe(terser())
        .pipe(dest('./dist'))
        .pipe(browserSync.stream());

}

function css() {
    return src('./css/*.css')
        .pipe(concat(minifiedCss))
        .pipe(replace(`../fonts/`, `static/`))
        .pipe(cleanCss({debug: true}, (details) => {
            console.log(`Original CSS size: ${details.stats.originalSize}`);
            console.log(`Minified CSS Size: ${details.stats.minifiedSize}`);
        }))
        .pipe(dest('./dist'))
        .pipe(browserSync.stream());

}

function html() {
    return src('./index.html')
        .pipe(replace(`js/app.js`, `${minifiedJs}`))
        .pipe(replace(`css/main.css`, `${minifiedCss}`))
        .pipe(replace(`images/`, `static/`))
        .pipe(dest('./dist'))
        .pipe(browserSync.stream());
}

function copyStaticFiles() {
    return src(['./fonts/*.woff', './images/*']).pipe(dest('./dist/static'));
}

function watchFiles() {
    watch('./js/*.js', javascript);
    watch('./css/*.css', css);
    watch('*.html', html);
}

function sync() {
    browserSync.init({
        server: {
            baseDir: './dist',
        }
    })
}

exports.build = parallel(javascript, css, html, copyStaticFiles);
exports.default = series(
    parallel(javascript, css, html, copyStaticFiles),
    parallel(watchFiles, sync)
);
