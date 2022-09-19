// import gulp from "gulp";
// import gpug from "gulp-pug";
// import del from "del";

// const routes = {
//   pug: {
//     src: "src/*.pug",
//     dest: "build"
//   },
// };

// //3)
// const pug = () =>
//   gulp.src(routes.pug.src).pipe(gpug()).pipe(gulp.dest(routes.pug.dest));

// //1)
// const clean = () => del(["build"]);

// //4)
// const prepare = () => gulp.series([clean]);

// //4)
// const assets = () => gulp.series([pug]);

// //2) //5)
// export const dev = gulp.series([prepare, assets]);
import gulp from "gulp";
import gpug from "gulp-pug";
import del from "del";

const routes = {
  pug: {
    src: "src/*.pug",
    dest: "build"
  }
};

const pug = () =>
  gulp
    .src(routes.pug.src)
    .pipe(gpug())
    .pipe(gulp.dest(routes.pug.dest));

const clean = () => del(["build"]);

const prepare = gulp.series([clean]);

const assets = gulp.series([pug]);

export const dev = gulp.series([prepare, assets]);
/*
1) clean이라는 task를 만들고, 얘가 할 일을 작성해줌. 즉 build폴더를 삭제해줌
2) clean이라는 task를 series에 추가해줌

+ 코드 정리

2)에서 보면 series에 두개가 다른 일을 하고 있음(빌드를 위한 준비 작업-clean, 파일 변환-pug)

3) export는 삭제해줌.(여기서 필요없는거였음). export는 package.json에서 쓸 command만 해주면 됨! 

4) prepare라는 task를 만들어서, 준비과정만 다루는 task로 정리해줌 / assets이라는 task 만들어서 파일 변환되는 task로 정리함.

5) 기존의 clean대신에 prepare를 넣어줌 / 기존의 pug대신 assets 넣어줌.
*/
