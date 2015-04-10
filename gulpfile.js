var assets="assets/",
	dist="dist/",
	gulp=require("gulp"),
	watch=require("gulp-watch"),
	rename=require("gulp-rename"),
	sass=require("gulp-ruby-sass"),
	uglify=require("gulp-uglify"),
	jshint=require("gulp-jshint"),
	notify=require("gulp-notify"),
	autoprefixer=require("gulp-autoprefixer"),
	livereload=require("gulp-livereload"),
	concat=require("gulp-concat");
gulp.task("scripts",function()
{
	return gulp.src(assets+"scripts/**/*.js")
				.pipe(jshint())
				.pipe(jshint.reporter("jshint-stylish"))
				.pipe(jshint.reporter("fail"))
				.on("error",notify.onError({message:"JS Error"}))
				.pipe(concat("app"))
				.pipe(rename({suffix:".min.js"}))
				.pipe(uglify())
				.pipe(gulp.dest(dist+"scripts"))
				.pipe(livereload());
});
gulp.task("styles",function()
{
	return sass(assets+"styles/style.scss",{style:"compressed"})
				.pipe(autoprefixer({
					browsers : ["> 1%"]
				}))
				.pipe(rename({suffix:".min"}))
				.pipe(gulp.dest(dist+"styles"))
				.pipe(livereload());
});
gulp.task("watch",function()
{
	
	livereload.listen();
	gulp.src("*.html")
				.pipe(watch("**/*.html"))
				.pipe(livereload());
	gulp.watch(assets+"styles/style.scss",["styles"]);
	gulp.watch(assets+"scripts/**/*.js",["scripts"]);
});
gulp.task("default",["scripts","styles","watch"]);