import gulp from "gulp";
import gpug from "gulp-pug";
import del from "del";
import ws from "gulp-webserver";
import image from "gulp-image";

//1) 
const sass = require("gulp-sass")(require("node-sass"));

const routes = {
  pug: {
    watch: "src/**/*.pug",
    src: "src/*.pug",
    dest: "build",
  },
  img: {
    src: "src/img/*",
    dest: "build/img",
  },
  //2)
  scss: {
    watch: "src/scss/**/*.scss", //4)
    src: "src/scss/style.scss",
    dest: "build/css",
  }
};

const pug = () =>
  gulp.src(routes.pug.src).pipe(gpug()).pipe(gulp.dest(routes.pug.dest));

const clean = () => del(["build/"]);

const webserver = () =>
  gulp.src("build").pipe(
    ws({
      livereload: true,
      open: true,
    })
  );

const img = () =>
  gulp.src(routes.img.src).pipe(image()).pipe(gulp.dest(routes.img.dest));

//3)
const styles = () => gulp.src(routes.scss.src).pipe(sass().on('error', sass.logError)).pipe(gulp.dest(routes.scss.dest))

const watch = () => {
  gulp.watch(routes.pug.watch, pug);
  gulp.watch(routes.pug.watch, img);
  gulp.watch(routes.scss.watch, styles) //5)
};

const prepare = gulp.series([clean, img]);

const assets = gulp.series([pug, styles]); //6)

const postDev = gulp.parallel([webserver, watch]);

export const dev = gulp.series([prepare, assets, postDev]);

/*
1) 설치한 gulp-sass와 node-sass를 불러옴 (공식문서 참조) 
2) sass 관련 routes를 작성함. 여기서는 style.scss만 컴파일 하면 됨
3) sass 관련 task를 만들어줌. pipe안에 공식문서를 참조해 sass().on 작성
4) sass에 대한 watch routes를 만들어줌
5) watch에 sass 넣어줌
6) assets에 넣어줌
+ style.scss에 스타일 작성해줌
*/