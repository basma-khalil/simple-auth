import gulp from 'gulp';
import htmlmin from 'gulp-htmlmin';
import imagemin from 'gulp-imagemin';
import fileinclude from 'gulp-file-include';
import sourcemaps from 'gulp-sourcemaps';
import postcss from 'gulp-postcss';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import cleanCSS from 'gulp-clean-css';
import ts from 'gulp-typescript';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';

const { src, dest, watch, series } = gulp;
const { init, write } = sourcemaps;
const tsProject = ts.createProject('tsconfig.json');

const filesPaths = {
  images: {
    src: 'src/images/**/*',
    dest: 'build/images/',
  },
  html: {
    src: 'src/views/',
    dest: 'build/',
  },
  css: {
    src: 'src/styles/*.css',
    dest: 'build/css/',
  },
  ts: {
    src: 'src/scripts/*.ts',
    dest: 'build/js/',
  },
  pwa: {
    src: 'src/pwa/',
    dest: 'build/',
  },
};

// Optimize and convert images to webp
function imageTask() {
  return src(filesPaths.images.src)
    .pipe(imagemin())
    .pipe(dest(filesPaths.images.dest));
}

// Include and minify html
function htmlTask() {
  return src(filesPaths.html.src + '*.html')
    .pipe(
      fileinclude({
        prefix: '@@',
        basepath: '@file',
      })
    )
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        removeComments: true,
      })
    )
    .pipe(dest(filesPaths.html.dest));
}

// Compile scss, then prefix and minify css
function cssTask() {
  const plugins = [tailwindcss(), autoprefixer()];

  return src(filesPaths.css.src)
    .pipe(init())
    .pipe(postcss(plugins))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(write('.'))
    .pipe(dest(filesPaths.css.dest));
}

// Concat, edit, compile and minify js
function jsTask() {
  return src(filesPaths.ts.src)
    .pipe(init())
    .pipe(tsProject())
    .pipe(
      babel({
        presets: ['@babel/env'],
      })
    )
    .pipe(uglify())
    .pipe(write('.'))
    .pipe(dest(filesPaths.ts.dest));
}

// Move Progressive Web App files, compile and minify if needed
function pwaTask() {
  const manifest = src(filesPaths.pwa.src + 'manifest.json').pipe(
    dest(filesPaths.pwa.dest)
  );
  const sw = src(filesPaths.pwa.src + 'sw.js')
    .pipe(
      babel({
        presets: ['@babel/env'],
      })
    )
    .pipe(uglify())
    .pipe(dest(filesPaths.pwa.dest));

  return manifest, sw;
}

// Watch task
function watchTask() {
  watch(
    [
      filesPaths.pwa.src + '*.*',
      filesPaths.images.src,
      filesPaths.html.src + '**/*.html',
      filesPaths.ts.src,
    ],
    series(imageTask, htmlTask, cssTask, jsTask, pwaTask)
  );
}

// Gulp build task
export const build = series(imageTask, htmlTask, cssTask, jsTask, pwaTask);

// Default Gulp task
export default watchTask;
