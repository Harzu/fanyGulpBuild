const gulp         = require('gulp')
const scripts      = require('./scripts.js')
const style        = require('./style.js')
const template     = require('./template.js')
const file         = require('./file.js')
const project_path = require('./path.js')
const DS           = require('./devServer.js')

function watch() {
	DS.devServe()
	gulp.watch(project_path.src.template + '**/*.pug', gulp.series(template.template))
	gulp.watch(project_path.src.style + '**/*.scss', gulp.series(
		style.style,
		style.inject_style
	))
	gulp.watch(project_path.src.scripts + '**/*.js', gulp.series(
		scripts.scripts,
		scripts.inject_scripts
	))
}

module.exports.watch = watch