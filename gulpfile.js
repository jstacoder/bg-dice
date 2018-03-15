var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');
var run = require('tape-run')
var tapSpec = require('tap-spec')
var summarize = require('tap-summary')

function compile(watch, reporter) {
	  var bundler = watchify(
			browserify(
				'./src/tests.js', 
				{ debug: true }
			).transform(babel)
		);

	  rebundle = () =>(
		  bundler.bundle()
      .on('error', err=>{ 
				console.error(err); 
				this.emit('end'); 
			})
			.pipe(run())
			.pipe(reporter())
		  .pipe(process.stdout)
		)

	  if (watch) {
		      bundler.on('update', function() {
			            console.log('-> bundling...');
			            rebundle();
			          });
		    }

	  rebundle();
}

function watch(reporter) {
	  return compile(true, reporter);
};

gulp.task('build', function() { return compile(false, tapSpec); });
gulp.task('watch', function() { return watch(tapSpec); });

gulp.task('build-summary', function() { return compile(false, summarize); });
gulp.task('watch-summary', function() { return watch(summarize); });

gulp.task('default', ['watch']);
