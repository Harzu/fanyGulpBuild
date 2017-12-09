const gulp         = require('gulp') 
const template     = require('./build/template.js')
const scripts      = require('./build/scripts.js')
const style        = require('./build/style.js')
const project_path = require('./build/path.js')
const watch        = require('./build/watch.js')
const file         = require('./build/file.js')

gulp.task('svg-sprite', file.svg.sprite)
gulp.task('svg-iconfont', file.svg.iconfont)
gulp.task('imagemin', file.image.imagemin)
gulp.task('sprite', file.image.sprite)

gulp.task('build', gulp.series(
	template.template      ,
	style.style            ,
	scripts.scripts        ,
	style.inject_style     ,
	scripts.inject_scripts
))

gulp.task('default', gulp.series(
	gulp.parallel(
		template.template , 
		style.style       ,
		scripts.scripts
	),
	style.inject_style     ,
	scripts.inject_scripts ,
	watch.watch
))