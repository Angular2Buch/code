var gulp = require('gulp'),
    ghpages = require('gh-pages'),
    path = require('path');

gulp.task('build', function () {

  // TODO
});

gulp.task('deploy', ['build'], function(cb) {

  //var dir = path.join(__dirname, 'build');
  var dir = __dirname;

  ghpages.publish(dir, {
    repo: 'https://' + process.env.GH_TOKEN + '@github.com/Angular2Buch/code-public.git',
    //silent: true
  }, cb);
});
