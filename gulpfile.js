const gulp = require("gulp");
const del = require("del");
const sass = require("gulp-sass")(require("sass"));
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");

// Example tasks
gulp.task("clean", function () {
  return del(["dist"]);
});

gulp.task("styles", function () {
  return gulp
    .src("src/scss/**/*.scss")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(gulp.dest("dist/css"));
});

gulp.task("scripts", function () {
  return gulp
    .src("src/js/**/*.js")
    .pipe(concat("app.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"));
});

// Define the build task
gulp.task("build", gulp.series("clean", "styles", "scripts"));
