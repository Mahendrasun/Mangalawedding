const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass")); // Ensure compatibility with gulp-sass
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");

// Use dynamic import for `del`
const styles = () =>
  gulp
    .src("src/scss/**/*.scss")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(gulp.dest("dist/css"))
    .on("end", () => console.log("Styles task completed"));

const scripts = () =>
  gulp
    .src("src/js/**/*.js")
    .pipe(concat("app.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"))
    .on("end", () => console.log("Scripts task completed"));

const clean = async () => {
  const { default: del } = await import("del");
  const deletedPaths = await del(["dist"]);
  console.log("Deleted files and directories:\n", deletedPaths);
};

gulp.task("build", gulp.series(clean, gulp.parallel(styles, scripts)));
