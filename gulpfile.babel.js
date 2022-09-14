import gulp from "gulp";
import gpug from "gulp-pug";

//3) 
const routes = {
    pug : { //3-1) 
        src : "src/*.pug", // 3-2) 만약 내부 폴더의 pug파일까지 찾을 때에는 "src/**/*.pug"
        dest : "build" //5-1)
    }
}

//1)
export const pug = () => gulp.src(routes.pug.src).pipe(gpug()).pipe(gulp.dest(routes.pug.dest))  //2) //4) //5)

//const 사용해서 task만들 경우
// export const dev = () => console.log("I will dev");
export const dev = gulp.series([pug])

//function 사용해서 task 만들 경우
// export function pug(){}


/*
1) gulp는 return해줘야 할 때가 있으므로 const로 작성. 공식문서의 usage 보면 return작성법 나와있음
** gulp.js API중 가장 중요한게 src(), dest()
2) src를 찾아서 하나의 패턴으로 모든 파일을 매칭시키도록 함
3) routes라는 오브젝트를 만들어서 사용하면 편리함
3-1) 루트폴더에 위치한 pug파일만 찾아서 컴파일 할때
4) 3)의 routes에서 작성한 것을 pug function에 알려줘야 함 => gulp.src('routes.pug.src')

5) gulp는 pipe랑 같이 쓰임. gulp는 작성한 파일들을 pipe에 넣어서 일종의 파일 흐름을 만듦
어떤 pipe는 컴파일이 될 수도 있고, 다른 pipe는 코드를 복사하는게 될 수도 있음. 또 다른 pipe는 코드를 최소화하는게 될 수도 있음. 
==> 여기서는 pipe에 pug 함수를 넣어줌 .pipe(pug())
==> 이어서 다른 pipe로 파일들을 어디에 넣어야 할지 적어줌 (5-1) build폴더를 만들어서 넣도록 해줌 

6) .gitignore파일을 만들어서 build폴더를 넣어줌

*/