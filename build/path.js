const path = require('path')

module.exports = {
	src: {
		global   : path.join(__dirname, '../dist')          ,
		template : path.join(__dirname, '../src/template/') ,
		scripts  : path.join(__dirname, '../src/js/')       ,
		style    : path.join(__dirname, '../src/sass/')     ,
		assets   : {
			img   : path.join(__dirname, '../src/assets/img/')   ,
			fonts : path.join(__dirname, '../src/assets/fonts/') 
		}
	},
	dist: {
		global   : path.join(__dirname, '../dist')        ,
		template : path.join(__dirname, '../dist/')       ,
		scripts  : path.join(__dirname, '../dist/js/')    ,
		style    : path.join(__dirname, '../dist/style/') ,
		assets   : {
			img   : path.join(__dirname, '../dist/assets/img/')   ,
			fonts : path.join(__dirname, '../dist/assets/fonts/') 
		}

	}
}