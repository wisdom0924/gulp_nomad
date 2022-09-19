import gulp from "gulp";
import gpug from "gulp-pug";
import del from "del";
import ws from "gulp-webserver";
import image from "gulp-image";
import autop from "gulp-autoprefixer"; //2)
import miniCSS from "gulp-csso"; //5)

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

const styles = () => gulp.src(routes.scss.src).pipe(sass().on('error', sass.logError)).pipe(autop()).pipe(miniCSS()).pipe(gulp.dest(routes.scss.dest)) //1) //3) //6)

const watch = () => {
  gulp.watch(routes.pug.watch, pug);
  gulp.watch(routes.pug.watch, img);
  gulp.watch(routes.scss.watch, styles);
};

const prepare = gulp.series([clean, img]);

const assets = gulp.series([pug, styles]); 

const postDev = gulp.parallel([webserver, watch]);

export const dev = gulp.series([prepare, assets, postDev]);

/*
[sass error 확인]
1) sass().on("error", sass.logError)라고 작성하면, 터미널에서 오류가 뜸
ex) styles.scss에서 변수 $red를 $reddd로 변경해봐~ [Error: Undefined variable: "$redddd".]이렇게 나옴.

[gulp-autoprefixer]
2) gulp-autoprefixer를 설치한 후, import해줌
3) styles에 새로운 pipe(autoprefix용)을 추가해줌.
4) package.json파일에 "browserslist": ["last 2 versions"]를 추가해줌.
    => 여기서는 브라우저의 2버전 아래까지 지원되도록 설정
∴ 페이지 실행하고, 브라우저에서 개발자도구로 css확인하면 autoprefixer 붙은걸 확인 할 수 있음(webkit 등등)

[gulp css minimize]
5) gulp-csso 설치 후 import 해줌
6) pipe에 csso 넣어줌
∴ style.css파일 확인해보면, 한 줄로 경량화 되어 나오는 걸 알 수 있음
*/