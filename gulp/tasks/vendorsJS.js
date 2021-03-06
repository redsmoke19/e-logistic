const gulp = require('gulp');
const concat = require('gulp-concat');

const vendorsScripts = [
  'node_modules/svg4everybody/dist/svg4everybody.min.js',
  'node_modules/swiper/swiper-bundle.min.js',
  'node_modules/choices.js/public/assets/scripts/choices.min.js',
  'node_modules/lightgallery/lightgallery.min.js',
  'node_modules/lightgallery/plugins/thumbnail/lg-thumbnail.min.js',
  'node_modules/lightgallery/plugins/zoom/lg-zoom.min.js'
];

module.exports = function vendors(cb) {
  return vendorsScripts.length
    ? gulp
      .src(vendorsScripts)
      .pipe(concat('libs.js'))
      .pipe(gulp.dest('dist/static/js/'))
    : cb();
};
