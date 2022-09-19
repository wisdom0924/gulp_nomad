import gulp from "gulp";
import gpug from "gulp-pug";
import del from "del";
import ws from "gulp-webserver";

const routes = {
  pug: {
    watch: "src/**/*.pug", //2) 
    src: "src/*.pug",
    dest: "build",
  },
};

const pug = () =>
  gulp.src(routes.pug.src).pipe(gpug()).pipe(gulp.dest(routes.pug.dest));

const clean = () => del(["build/"]);

const webserver = () =>
  gulp.src("build")
    .pipe(
      ws({
        livereload: true, 
        open: true,
      })
    );

//1)
const watch = () => {
    gulp.watch(routes.pug.watch, pug) //3)
}

const prepare = gulp.series([clean]);

const assets = gulp.series([pug]);

const postDev = gulp.series([webserver, watch]); //4)
// const postDev = gulp.parallel([webserver, watch]); //5)

export const dev = gulp.series([prepare, assets, postDev]); 

/*
1) watch API를 사용할 task 만들어줌
2) 내부의 pug파일까지 모두 지켜봐야 하므로, routes에 watch를 하나 더 만들어줌. 
3) 지켜볼 파일을 작성해줌.(2)에서 routes로 설정해주었으므로, 이 경로 작성 / 어떤 task 수행할건지 작성해줌. 여기서는 수정되면 파일 변환인 pug가 되어야 하니까 얘를 작성함
4) watch를 postDev에 넣어줌. 즉, gulp가 실행되면 dev의 series들을 실행하고, postDev를 통해 웹서버를 실행하고 파일 변동사항 체크.
=> 웹서버 실행하고(gulp dev), pug파일 수정하면 잠시후 웹페이지에도 수정사항 반영됨.

+ 
5) 만약에 두 task를 동시에 실행하고 싶다면 series가 아닌 parallel 사용하면 됨. 
*/
