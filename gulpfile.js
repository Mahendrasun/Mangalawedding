const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass")); // Ensure compatibility with gulp-sass
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");

// Use dynamic import for `del`
const clean = async () => {
  const { deleteAsync } = await import("del");
  return deleteAsync(["dist"]);
};

const styles = () =>
  gulp
    .src("src/scss/**/*.scss")
    .pipe(sass({ outputStyle: "compressed" }))
    .on("error", console.error) // Debugging for errors
    .pipe(gulp.dest("dist/css"));

const scripts = () =>
  gulp
    .src("src/js/**/*.js")
    .pipe(concat("app.js"))
    .pipe(uglify())
    .on("error", console.error) // Debugging for errors
    .pipe(gulp.dest("dist/js"));

gulp.task("build", gulp.series(clean, gulp.parallel(styles, scripts)));
