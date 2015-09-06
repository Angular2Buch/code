var gulp = require('gulp-help')(require('gulp')),
    ghpages = require('gh-pages'),
    path = require('path'),
    fs = require('fs'),
    markdown = require('gulp-markdown'),
    debug = require('gulp-debug'),
    rename = require("gulp-rename"),
    insert = require('gulp-insert'),
    highlight = require('highlight.js'),
    runSequence = require('run-sequence');

require('./gulpfile-copy-tasks')(gulp);


// converts some Readme.md files to index.html files, available next to original file (for local testing)
// ignored by .gitignore though
// hint: star in front maintains path
gulp.task('convert markdown', 'Converts some Readme.md files to index.html files', function () {

  var header = fs.readFileSync('.readme/readme_header.html', 'utf8');
  var footer = fs.readFileSync('.readme/readme_footer.html', 'utf8')
    .replace('##DATE##', new Date().toISOString());

  return gulp.src(['*README.md', '*text/angular-module/README.md', '*text/angular-forms/README.md'])
    //.pipe(debug({title: 'convert markdown'}))
    .pipe(markdown({
      breaks: true,
      highlight: function (code, lang) {
        return lang ? highlight.highlight(lang, code).value : highlight.highlightAuto(code).value;
      }
    }))
    .pipe(insert.wrap(header, footer))
    .pipe(rename(function (path) {
      path.basename = "index"; // *README.html --> *index.html
    }))
    .pipe(gulp.dest('./'));
});

// convert markdown must be done before the copy tasks, so that converted files are copied, too
gulp.task('build', 'Runs all tasks, except deploy', function (done) {
  runSequence('convert markdown', 'copy files', done);
});

// pushes all content of /dist to gh-pages repository
gulp.task('deploy', 'Pushes all content of /dist to gh-pages repository', ['build'], function(cb) {

  var dir = path.join(__dirname, 'dist');
  var message = 'Auto-generated commit';

  if (process.env.TRAVIS) {

    message += '\n\n' +
      'Triggered by commit: https://github.com/' + process.env.TRAVIS_REPO_SLUG + '/commit/' + process.env.TRAVIS_COMMIT + '\n' +
      'Travis build: https://travis-ci.org/'     + process.env.TRAVIS_REPO_SLUG + '/builds/' + process.env.TRAVIS_BUILD_ID;
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
