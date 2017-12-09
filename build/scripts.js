const sourcemaps   = require('gulp-sourcemaps')
const plumber      = require('gulp-plumber')
const rename       = require('gulp-rename')
const notify       = require('gulp-notify')
const inject       = require('gulp-inject')
const project_path = require('./path.js')
const gulp         = require('gulp')

const webpack      = require('gulp-webpack')
const uglify       = require('gulp-uglify')

function scripts() {
	return gulp.src(project_path.src.scripts + '**/*.js')
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(webpack({
			module: {
				loaders: [
					{
						test: /\.js$/,
						loader: 'babel-loader',
						options: {
							presets: ['env', 'es2015', 'stage-1']
						}
					}
				]
			}
		}))
		.pipe(uglify())
		.pipe(rename('main.min.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(project_path.dist.scripts))
}

function inject_scripts() {
	return gulp.src(project_path.dist.template + 'index.html')
		.pipe(inject(gulp.src(project_path.dist.scripts + 'main.min.js'), {relative:true}))
		.pipe(gulp.dest(project_path.dist.template))
}

module.exports.scripts        = scripts
module.exports.inject_scripts = inject_scripts