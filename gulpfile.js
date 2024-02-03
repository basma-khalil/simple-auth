import gulp from 'gulp';
import htmlmin from 'gulp-htmlmin';
import imagemin from 'gulp-imagemin';
import fileinclude from 'gulp-file-include';
import sourcemaps from 'gulp-sourcemaps';
import postcss from 'gulp-postcss';
import tailwindcss from 'tailwindcss';
import purgecss from '@fullhuman/postcss-purgecss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import { rollup } from 'rollup';
import rollupTypescript from '@rollup/plugin-typescript';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';

const { src, dest, watch, series } = gulp;
const { init, write } = sourcemaps;

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
    src: 'src/scripts/ts/main.ts',
    dest: 'src/scripts/js/main.js',
  },
  js: {
    src: 'src/scripts/js/*.js',
    dest: 'build/js/',
  },
  pwa: {
    src: 'src/pwa/',
    dest: 'build/',
  },
};

// Optimize images
function imageTask() {
  return src(filesPaths.images.src)
    .pipe(imagemin())
    .pipe(dest(filesPaths.images.dest));
}

// Include and minify html
function htmlTask() {
  return src(filesPaths.html.src + '*.html')
    .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file',
    }))
    .pipe(htmlmin({
        collapseWhitespace: true,
        removeComments: true,
    }))
    .pipe(dest(filesPaths.html.dest));
}

// Compile tailwindcss, then purge, prefix, and minify css
function cssTask() {
  const plugins = [
    tailwindcss(),
    purgecss({
      content: ['./**/*.{html,js,ts}'],
      defaultExtractor: (content) => content.match(/[\w\-:.\/\[#%\]]+(?<!:)/g) || [],
    }),
    autoprefixer(),
    cssnano({
      preset: ['default', { discardComments: { removeAll: true } }],
    }),
  ];

  return src(filesPaths.css.src)
    .pipe(init())
    .pipe(postcss(plugins))
    .pipe(write('.'))
    .pipe(dest(filesPaths.css.dest));
}

// Compile ts files into one js file
async function tsTask() {
	const bundle = await rollup({
			input: filesPaths.ts.src,
			plugins: [rollupTypescript({ module: "ESNext" })]
		})
		await bundle.write({
				file: filesPaths.ts.dest,
				format: 'iife',
		});
}

// Compile, and minify js
function jsTask() {
  return src(filesPaths.js.src)
    .pipe(init())
    .pipe(babel({
        presets: ['@babel/env'],
    }))
    .pipe(uglify())
    .pipe(write('.'))
    .pipe(dest(filesPaths.js.dest));
}

// Move Progressive Web App files, compile and minify if needed
function pwaTask() {
  const manifest = src(filesPaths.pwa.src + 'manifest.json')
    .pipe(dest(filesPaths.pwa.dest));

  const sw = src(filesPaths.pwa.src + 'sw.js')
    .pipe(babel({
        presets: ['@babel/env'],
    }))
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
      filesPaths.css.src,
      filesPaths.ts.src,
    ],
    series(imageTask, htmlTask, cssTask, tsTask, jsTask, pwaTask)
  );
}

// Gulp build task
export const build = series(imageTask, htmlTask, cssTask, tsTask, jsTask, pwaTask);

// Default Gulp task
export default watchTask;
