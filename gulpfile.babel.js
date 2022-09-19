import gulp from "gulp";
import gpug from "gulp-pug";
import del from "del";
import ws from "gulp-webserver";
import image from "gulp-image"

const routes = {
  pug: {
    watch: "src/**/*.pug", 
    src: "src/*.pug",
    dest: "build",
  },
  //1)
  img : {
    src: "src/img/*", //2)
    dest: "build/img" //3) 
  }
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
//4) 
const img = () => gulp.src(routes.img.src).pipe(image()).pipe(gulp.dest(routes.img.dest))

const watch = () => {
    gulp.watch(routes.pug.watch, pug) 
    gulp.watch(routes.pug.watch, img) //6)
}

const prepare = gulp.series([clean, img]); //5)

const assets = gulp.series([pug]);

const postDev = gulp.parallel([webserver, watch]); 

export const dev = gulp.series([prepare, assets, postDev]); 


/*
1) gulp-image를 설치 후, 사용하기 위해 routes에 만들어줌
2) 이미지 확장자와 상관 없이 모든 이미지를 경로로 설정
    만약, png 파일만 사용하고 싶다면 "src/img/*.png"라고 적어주면 됨
3) destination에는 빌드될 폴더에 새로운 폴더 img를 생성하게 해줌
4) img에 관한 task 만들어줌. pipe에 설치 후 import한 image를 넣어줌. 또다른 pipe연결해서 dest 설정해줌
=> 문제는, img파일이 시간을 많이 소모한다는 것(파일 용량이 큰 경우 처리 시간이 길어짐). 따라서 img 저장할 때마다 매번 설정되지 않게 해줘야 함. 
5) 그러므로, assets에 넣지 않고(파일 변환 작업) dev의 준비작업(prepare)에 넣어줌. 여기에 넣으면 build하기 전의 준비과정에서도 동작하게 됨(물론 assets에 넣어도 상관 없긴 함)
∴ 이렇게 하고 npm run dev 실행하면 이미지 나오는 걸 확인 할 수 있음. (build 폴더 하위에 img 폴더도 생김)

6) img task를 독립적으로 사용하기를 원할 경우, watch에 넣어서 사용하면 됨
-> img 파일에 변동을 줄 때마다 최적화 과정을 실행하겠다는 의미임
*/