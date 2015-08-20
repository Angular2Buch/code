var gulp = require('gulp-help')(require('gulp')),
    ghpages = require('gh-pages'),
    path = require('path'),
    del = require('del');
    fs = require('fs'),
    markdown = require('gulp-markdown'),
    debug = require('gulp-debug'),
    rename = require("gulp-rename"),
    insert = require('gulp-insert'),
    highlight = require('highlight.js');

// cleans dist folder before all other tasks
gulp.task('clean /dist', false, function (done) {
  del(['dist/**/*'], done);
});

// converts some Readme.md files to index.html files, available next to original file (for local testing)
// ignored by .gitignore though
// hint: star in front maintains path
gulp.task('convert markdown', 'Converts some Readme.md files to index.html files', function () {

  var header = fs.readFileSync('.readme/readme_header.html', 'utf8');
  var footer = fs.readFileSync('.readme/readme_footer.html', 'utf8')
    .replace('##DATE##', new Date().toISOString());

  return gulp.src(['*README.md', '*about-modules/README.md'])
    //.pipe(debug({title: 'convert markdown'}))
    .pipe(markdown({
      breaks: true,
      highlight: function (code, lang) {
        return lang ? highlight.highlight(lang, code).value : highlight.highlightAuto(code).value
      }
    }))
    .pipe(insert.wrap(header, footer))
    .pipe(rename(function (path) {
      path.basename = "index"; // *README.html --> *index.html
    }))
    .pipe(gulp.dest('./'));
});

// copies all folders & files (that have no leading dot in filename) to folder dist
// excludes all node_modules folders (see https://github.com/gulpjs/gulp/issues/165#issuecomment-32626133) and various other files
gulp.task('copy files to /dist', false, ['clean /dist', 'copy angular to /lib/angular-latest-bundle',], function () {

  return gulp.src(['**/*',
    '!**/node_modules{,/**}',
    '!dist{,/**}',
    '!e2e{,/**}',
    '!gulpfile.js',
    '!**/package.json',
    '!**/tsconfig.json',
    ])
    //.pipe(debug({title: 'copy files to /dist'}))
    .pipe(gulp.dest('./dist/'));
});

// copies angular bundles to /lib/angular-latest-bundle
gulp.task('copy angular to /lib/angular-latest-bundle', false, function () {

  return gulp.src(['node_modules/angular2/bundles/**/*'])
    //.pipe(debug({title: 'copy angular bundle'}))
    .pipe(gulp.dest('./lib/angular-latest-bundle/'));
});

gulp.task('build', ['copy files to /dist', 'convert markdown'], function () {

});

// pushes all content of /dist to gh-pages repository
gulp.task('deploy', 'Pushes all content of /dist to gh-pages repository', ['build'], function(cb) {

  var dir = path.join(__dirname, 'dist');
  var message = 'Auto-generated commit';

  if (process.env.TRAVIS) {

    message += '\n\n'
      + 'Triggered by commit: https://github.com/'  + process.env.TRAVIS_REPO_SLUG + '/commit/' + process.env.TRAVIS_COMMIT + '\n'
      + 'Travis build: https://travis-ci.org/' + process.env.TRAVIS_REPO_SLUG + '/builds/' + process.env.TRAVIS_BUILD_ID
  }

  ghpages.publish(dir, {
    repo: 'https://' + process.env.GH_TOKEN + '@github.com/Angular2Buch/code-public.git',
    dotfiles: true,
    message: message,
    user: {
      name: 'The Buildbot',
      email: 'buildbot@haushoppe-its.de'
    },
    silent: true // hides GH_TOKEN
  }, cb);
});
