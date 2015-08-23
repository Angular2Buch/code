var del = require('del');
    debug = require('gulp-debug'),
    es = require('event-stream');

// only files will pass, this excludes empty directories
var onlyFiles = function() {
    return es.map(function(file, cb) {
      return file.stat.isFile() ? cb(null, file) : cb();
    });
};

module.exports = function(gulp) {

  // cleans /lib/angular-latest-bundle folder
  gulp.task('clean angular bundle', false, function (done) { del(['lib/angular-latest-bundle/**/*'], done); });

  // copies angular bundles to /lib/angular-latest-bundle
  gulp.task('copy angular bundle', false, ['clean angular bundle'], function () {

    return gulp.src(['node_modules/angular2/bundles/*'])
      .pipe(onlyFiles())
      //.pipe(debug({title: 'copy angular bundle'}))
      .pipe(gulp.dest('./lib/angular-latest-bundle/'));
  });


  // cleans /lib/angular-latest-typings folder
  gulp.task('clean angular typings', false, function (done) { del(['lib/angular-latest-typings/**/*'], done); });

  // copies angular tyoings to /lib/angular-latest-typings
  gulp.task('copy angular typings', false, ['clean angular typings'], function () {

    return gulp.src(['node_modules/angular2/bundles/typings/**/*'])
      //.pipe(debug({title: 'copy angular typings'}))
      .pipe(gulp.dest('./lib/angular-latest-typings/'));
  });


  // cleans /dist folder
  gulp.task('clean /dist', false, function (done) { del(['dist/**/*'], done); });

  // starts proceeding copy tasks
  // copies all folders & files (that have no leading dot in filename) to folder dist
  // excludes all node_modules folders (see https://github.com/gulpjs/gulp/issues/165#issuecomment-32626133) and various other files
  gulp.task('copy files', false, [
    'clean /dist',
    'copy angular bundle',
    'copy angular typings'], function () {

    return gulp.src(['**/*',
      '!**/node_modules{,/**}',
      //'!**/jspm_packages{,/**}',
      '!dist{,/**}',
      '!e2e{,/**}',
      '!gulpfile*'
      ])
      //.pipe(debug({title: 'copy files to /dist'}))
      .pipe(gulp.dest('./dist/'));
  });
};
