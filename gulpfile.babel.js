import gulp from "gulp";
import gpug from "gulp-pug";
import del from "del";

const routes = {
    pug : {  
        src : "src/*.pug", 
        dest : "build" 
    }
}

export const pug = () => gulp.src(routes.pug.src).pipe(gpug()).pipe(gulp.dest(routes.pug.dest)) 

//1) 
export const clean = () => del(["build"])

//2) 
export const dev = gulp.series([clean, pug])


/*
1) clean이라는 task를 만들고, 얘가 할 일을 작성해줌. 즉 build폴더를 삭제해줌
2) clean이라는 task를 series에 추가해줌
*/