import gulp from "gulp";
import gpug from "gulp-pug";
import del from "del";
import ws from "gulp-webserver";
import image from "gulp-image";
import autop from "gulp-autoprefixer";
import miniCSS from "gulp-csso"; 
import bro from "gulp-bro" //1)
import babelify from "babelify" //1)

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
  //2)
  js: {
    src:"src/js/main.js", //2-1)
    dest:"build/js",
    watch: "src/js/*.js" //5-1)

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

const styles = () => gulp.src(routes.scss.src).pipe(sass().on('error', sass.logError)).pipe(autop()).pipe(miniCSS()).pipe(gulp.dest(routes.scss.dest)) 

//3)
const js = () => gulp.src(routes.js.src).pipe(bro({
  //4)
  transform:[
    babelify.configure({
      presets:['@babel/preset-env']
    }), 
    [ 'uglifyify', { global: true } ]
  ]
})).pipe(gulp.dest(routes.js.dest))

const watch = () => {
  gulp.watch(routes.pug.watch, pug);
  gulp.watch(routes.pug.watch, img);
  gulp.watch(routes.scss.watch, styles);
  gulp.watch(routes.js.watch, js);
};

const prepare = gulp.series([clean, img]);

const assets = gulp.series([pug, styles, js]); //6)

const postDev = gulp.parallel([webserver, watch]);

export const dev = gulp.series([prepare, assets, postDev]);

/*
1) 설치한 gulp-bro과 babelify를 import해줌
2) task에 사용될 src를 routes로 만들어줌
2-1) src 경로에는 파일 하나만 작성해주면 됨. 왜냐하면, js>util.js는 import해서 main.js에서 사용되기 때문
3) 새로운 task를 만들어줌
4) gulp-bro 가이드를 보고 transform 작성해줌. 여기서 preset에는 가이드처럼 es2015를 쓰는게 아니고 우리가 진짜 사용하는 @babel/preset-env를 작성해줌
만약에 react로 작업중이라면 preset에 react preset을 넣어줌
5) js는 모든 파일을 지켜봐야 하므로 watch에 작성해줌
5-1)에서 watch할 파일 경로 작성
6) 파일이 변환되어야 하므로 이에 관한 task인 assets에 넣어줌 => 이렇게 하면 처음에 실행하고 그 이후부터 쭉 watch하게 됨
∴ 파일 실행하면 main.js에 작성한 내용이 콘솔에 뜨게 됨 + build>js>main.js 파일을 확인해보면 스크립트가 babel에 의해 변환되어 나오는 걸 알 수 있음
*/