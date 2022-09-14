// import gulp from "gulp" //1)
const gulp = require("gulp") //2)


/*
1) 이렇게 작성하고 터미널에서 gulp dev 실행하면 import가 실행되지 않음. 
2) 2) 이렇게 작성하고 다시 gulp dev 실행하면, gulpfile.js는 실행되지만, [Task never defined: dev] 오류가 뜸. 이거는 task가 없어서 생기는 에러임.
*/