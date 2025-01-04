import del from "del";
import gulp from "gulp";
import sass from "gulp-sass";
import concat from "gulp-concat";
import uglify from "gulp-uglify";

// Example tasks
const clean = () => del(["dist"]);
const styles = () =>
  gulp
    .src("src/scss/**/*.scss")
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(gulp.dest("dist/css"));
const scripts = () =>
  gulp
    .src("src/js/**/*.js")
    .pipe(concat("app.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"));

export const build = gulp.series(clean, gulp.parallel(styles, scripts));
