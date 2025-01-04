const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass")); // Ensure compatibility with gulp-sass
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");

// Use dynamic import for `del`
const clean = async () => {
  const { deleteAsync } = await import("del");
  return deleteAsync(["dist"]);
};

const ensureDistExists = (done) => {
  const fs = require("fs");
  const path = "dist";
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
    console.log("Created 'dist' directory");
  }
  done();
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

const createPlaceholder = () =>
  gulp
    .src("*", { read: false })
    .pipe(gulp.dest("dist"))
    .on("end", () => console.log("Placeholder created"));

gulp.task(
  "build",
  gulp.series(clean, gulp.parallel(styles, scripts), createPlaceholder)
);
