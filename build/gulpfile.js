const { series, src, dest } = require("gulp");
const less = require("gulp-less");
const autoprefixer = require("gulp-autoprefixer");
const cssmin = require("gulp-cssmin");

function compile() {
  return src("../src/**/*.less")
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(cssmin())
    .pipe(dest("../lib"));
}

function copyLess() {
  return src("../src/**/*.less").pipe(dest("../lib"));
}

exports.build = series(compile, copyLess);
