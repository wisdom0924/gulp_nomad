import gulp from "gulp";
import gpug from "gulp-pug";
import del from "del";
import ws from "gulp-webserver";
import image from "gulp-image";
import autop from "gulp-autoprefixer";
import miniCSS from "gulp-csso";
import bro from "gulp-bro";
import babelify from "babelify";
import ghPages from "gulp-gh-pages"; //1)

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
  scss: {
    watch: "src/scss/**/*.scss",
    src: "src/scss/style.scss",
    dest: "build/css",
  },
  js: {
    src: "src/js/main.js",
    dest: "build/js",
    watch: "src/js/*.js",
  },
};

const pug = () =>
  gulp.src(routes.pug.src).pipe(gpug()).pipe(gulp.dest(routes.pug.dest));

const clean = () => del(["build/", ".publish"]); //4)

const webserver = () =>
  gulp.src("build").pipe(
    ws({
      livereload: true,
      open: true,
    })
  );

const img = () =>
  gulp.src(routes.img.src).pipe(image()).pipe(gulp.dest(routes.img.dest));

const styles = () =>
  gulp
    .src(routes.scss.src)
    .pipe(sass().on("error", sass.logError))
    .pipe(autop())
    .pipe(miniCSS())
    .pipe(gulp.dest(routes.scss.dest));

const js = () =>
  gulp
    .src(routes.js.src)
    .pipe(
      bro({
        transform: [
          babelify.configure({
            presets: ["@babel/preset-env"],
          }),
          ["uglifyify", { global: true }],
        ],
      })
    )
    .pipe(gulp.dest(routes.js.dest));

//2) 
const gh = () => gulp.src("build/**/*").pipe(ghPages())

const watch = () => {
  gulp.watch(routes.pug.watch, pug);
  gulp.watch(routes.pug.watch, img);
  gulp.watch(routes.scss.watch, styles);
  gulp.watch(routes.js.watch, js);
};

const prepare = gulp.series([clean, img]);

const assets = gulp.series([pug, styles, js]);

const postDev = gulp.parallel([webserver, watch]);

//3-1)
export const build = gulp.series([prepare, assets]);

export const dev = gulp.series([build, postDev]); // 3-2)
//3-2)
export const deploy = gulp.series([build, gh, clean]) //5)




/*
1) 설치한 gulp-gh-pages를 사용하도록 gulpfile.babel.js에 import함
2) 새로운 task를 만들어줌
3) export를 하나 더 하기 위해 package.json에 작성한 build, dev라는 커맨드 외에 deploy라는 스크립트를 하나 더 만들어줌(package.json 참조)
  3-1) build를 만들어줌. build가 하는 일은, postDev를 제외하고 prepare, assets만 넣어줌. (얘네 둘을 build로 분리해서 사용한다고 보면 됨)
  3-2) prepare, assets을 build로 분리했으므로
  3-3) deploy를 만들어줌. 얘는 build하고 배포를 담당하게 됨

  ∴ gulp dev, gulp build 실행하면 잘 작동하는 걸 확인 할 수 있음. 
  ∴ gulp deploy 실행하면 .publish폴더가 생기는데, 이건 캐시같은거라 필요없으니 지워주는 작업을 해주면 됨. (이전에 사용했던 clean에 폴더를 지우게 함)
  그리고 터미널에 branch를 만들었고, push했다고 나옴. 
4) 이전에 사용했던 clean에 불필요한 폴더인 .publish를 지우게 함
5) deploy할때 clean을 다시 실행하도록 넣어줌

∴ 브라우저에서 github.io url로 페이지 배포됐는지 확인
url : 리포지토리명.github.io/리포지토리명
즉, 여기서는 wisdom0924.github.io/gulp_nomad (재확인 필요함)
*/