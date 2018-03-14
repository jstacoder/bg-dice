var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');
var run = require('tape-run')
var tapSpec = require('tap-spec')

function compile(watch) {
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
			.pipe(tapSpec())
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

function watch() {
	  return compile(true);
};

gulp.task('build', function() { return compile(); });
gulp.task('watch', function() { return watch(); });

gulp.task('default', ['watch']);
