//代码清单4-1 用Babel处理ES2015和React的gulpfile

const gulp = require('gulp')
const babel = require('gulp-babel')
const concat = require('gulp-concat')
const sourcemaps = require('gulp-sourcemaps')
const watch = require('gulp-watch')

gulp.task('default', ()=>{
    return gulp.src('app/*.jsx')
        .pipe(sourcemaps.init())
        .pipe(babel({
            'presets': ['es2015', 'react']
        }))
        .pipe(concat('all.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'))
})

gulp.task('watch', ()=>{
    watch('app/*.jsx', ()=>gulp.start('default'))
})

// gulp.task('default', ()=>{
//     return watch('app/*.jsx', ()=>{
//         gulp.src('app/*.jsx')
//             .pipe(sourcemaps.init())
//             .pipe(babel({
//                 'presets': ['es2015', 'react']
//             }))
//             .pipe(concat('all.js'))
//             .pipe(sourcemaps.write('.'))
//             .pipe(gulp.dest('dist'))
//             })
// })