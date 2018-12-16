const gulp = require("gulp");
const exec = require("child_process").exec;

var paths = {
  docker: [
    "./base-images/*/Dockerfile.template",
    "./host-images/*/Dockerfile.template",
  ],
};

function clean() {
  return del(["./*-images/*/*.dockerfile"]);
}

function dockerfiles(done) {
  exec("./scripts/gen-dockerfiles.sh", (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    done(err);
  });
}

function watch() {
  paths.docker.forEach((path) => {
    gulp.watch(path, dockerfiles);
  });
}

/*
 * You can use CommonJS `exports` module notation to declare tasks
 */
exports.clean = clean;
exports.dockerfiles = dockerfiles;
exports.watch = watch;

gulp.task("default", watch);
