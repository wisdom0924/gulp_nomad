import gulp from "gulp";
import gpug from "gulp-pug";
import del from "del";
import ws from "gulp-webserver";

const routes = {
  pug: {
    src: "src/*.pug",
    dest: "build",
  },
};

const pug = () =>
  gulp.src(routes.pug.src).pipe(gpug()).pipe(gulp.dest(routes.pug.dest));

const clean = () => del(["build/"]);

//1)
const webserver = () =>
  gulp.src("build") //2)
    .pipe(
      ws({
        //3)
        livereload: true, //4)
        open: true,
      })
    );

const prepare = gulp.series([clean]);

const assets = gulp.series([pug]);

//5)
const postDev = gulp.series([webserver]);

export const dev = gulp.series([prepare, assets, postDev]); //6)

/*
1) 웹서버 실행 task를 만들어줌
2) src의 경로는 보여주고 싶은 폴더. 여기서는 빌드된 파일 보여줘야 하므로 build 폴더 작성 
3) pipe에서 ws(webserver)를 실행해줌
4) 공식문서 참고해서 필요한 옵션 설정해줌
5) task분리해주고 
6) series에 추가해줌
*/
