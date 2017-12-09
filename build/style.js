const sourcemaps   = require('gulp-sourcemaps')
const plumber      = require('gulp-plumber')
const rename       = require('gulp-rename')
const notify       = require('gulp-notify')
const inject       = require('gulp-inject')
const project_path = require('./path.js')
const gulp         = require('gulp')

const autoprefixer = require('gulp-autoprefixer')
const sass         = require('gulp-sass')
const csso         = require('gulp-csso')

function style() {
	return gulp.src(project_path.src.style + '**/*.scss')
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(autoprefixer({
            browsers : ['last 2 versions'],
            cascade  : false
        }))
		.pipe(csso({
			restructure :false,
			sourceMap   :false,
			debug       :true
		}))
		.pipe(rename('style.min.css'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(project_path.dist.style))
}

function inject_style() {
	return gulp.src(project_path.dist.template + 'index.html')
		.pipe(inject(gulp.src(project_path.dist.style + 'style.min.css', {read:false}), {relative:true}))
		.pipe(gulp.dest(project_path.dist.template))
}

module.exports.style        = style
module.exports.inject_style = inject_style