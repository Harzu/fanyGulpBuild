const sourcemaps   = require('gulp-sourcemaps')
const plumber      = require('gulp-plumber')
const rename       = require('gulp-rename')
const notify       = require('gulp-notify')
const project_path = require('./path.js')
const gulp         = require('gulp')

const pug          = require('gulp-pug')
const eslint       = require('gulp-eslint')

function template() {
	return gulp.src(project_path.src.template + '**/*.pug')
		.pipe(plumber())
		.pipe(pug({
			verbose :true,
			pretty  : '\t'
		}))
		.pipe(eslint.format())
		.pipe(eslint.failAfterError())
		.pipe(gulp.dest(project_path.dist.template))
}

module.exports.template = template