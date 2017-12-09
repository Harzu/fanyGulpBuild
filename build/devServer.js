const devServer    = require('browser-sync').create()
const gulp         = require('gulp')
const project_path = require('./path.js')
const reload       = devServer.reload


module.exports.devServe = function () {
	devServer.init({
        server: {
            baseDir: "./dist"
        }
    })

    gulp.watch('./src/**/*.*').on('change', reload)
}