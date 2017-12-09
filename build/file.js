const gulp         = require('gulp')
const plumber      = require('gulp-plumber')
const project_path = require('./path.js')
const iconfont     = require('gulp-iconfont')
const svgSprite    = require('gulp-svg-sprites')
const responsive   = require('gulp-responsive')
const imagemin     = require('gulp-imagemin')
const merge        = require('merge-stream')
const buffer       = require('vinyl-buffer')
const imgsprite    = require('gulp.spritesmith')

function fonts() {
	return gulp.src(project_path.src.assets.fonts + '**/*.{ttf,woff,woff2,svg,eot}')
		.pipe(gulp.dest(project_path.dist.assets.fonts))
}

class Image {

	imagemin() {
		return gulp.src(project_path.src.assets.img + '*')
			.pipe(imagemin())
			.pipe(responsive({
				'background-*.jpg': {
			        width: 700,
			        quality: 50
			    },
			    'cover.png': {
			        width: '50%',
			        // convert to jpeg format 
			        format: 'jpeg',
			        rename: 'cover.jpg'
			    },
			      // produce multiple images from one source 
			    'logo.png': [
			        {
			            width: 200
			        },
			        {
			            width: 200 * 2,
			            rename: 'logo@2x.png'
			        }
			    ]
			}))
			.pipe(gulp.dest(project_path.dist.assets.img))
	}
	
	sprite() {
		const spriteData = gulp.src(project_path.src.assets.img + 'icons/**/*.png')
			.pipe(imgsprite({
				imgName : 'sprite.png',
				cssName : 'sprite.css'
			}))

		const imgStream = spriteData.img
			.pipe(buffer())
			.pipe(imagemin())
			.pipe(gulp.dest(project_path.dist.assets.img + 'icons/'))

		const cssStream = spriteData.css
			.pipe(gulp.dest(project_path.dist.style + 'sprite/'))
	}
}

class Svg {
	
	iconfont() {
		return gulp.src([project_path.src.assets.img + 'svg/*.svg'])
			.pipe(iconfont({
				fontName       : 'icon-fonts'           ,
				prependUnicode : true                   ,
				formats        : ['ttf', 'eot', 'woff'] 
			}))
			.on('glyphs', function(glyphs, options) {
		        console.log(glyphs, options);
		    })
		    .pipe(gulp.dest(project_path.dist.assets.fonts))
	}

	sprite() {
		return gulp.src(project_path.src.assets.img + 'svg/**/*.svg')
        	.pipe(svgSprite({mode: "symbols"}))
        	.pipe(gulp.dest(project_path.dist.assets.img + 'svg/'))
	}
}

const svg   = new Svg()
const image = new Image()

module.exports.fonts = fonts
module.exports.image = image
module.exports.svg   = svg