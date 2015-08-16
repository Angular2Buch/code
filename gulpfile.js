var gulp = require('gulp'),
    ghpages = require('gh-pages'),
    path = require('path'),
    del = require('del');

// cleans dist folder before all other tasks
gulp.task('clean dist', function (cb) {
  del(['dist/**/*'], cb);
});

// copies all folders & files (that have no leading dot in filename) to folder dist
// excludes node_modules folder
gulp.task('build', ['clean dist'], function () {

  gulp.src(['**/*', '!node_modules'])
    .pipe(gulp.dest('./dist/'));
});

// uses gh-pages to push all content of dist to other repo
gulp.task('deploy', ['build'], function(cb) {

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
