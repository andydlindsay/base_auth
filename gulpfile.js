// include gulp
const gulp = require('gulp');

// include plugins
const eslint = require('gulp-eslint'),
      mocha = require('gulp-mocha');

// lint task
gulp.task('lint', () => {
    return gulp.src(['*.js', 'models/*.js', 'routes/*.js'])
        .pipe(eslint({ useEslintrc: true }))
        .pipe(eslint.formatEach())
        .pipe(eslint.failOnError());
});

// mocha testing
gulp.task('test', () => {
    return gulp.src(['test/*.js'])
        .pipe(mocha({ timeout: 10000 }))
        .on('error', () => {});
});

// watch for file changes
gulp.task('watch', () => {
    gulp.watch('*.js', ['lint']);
    gulp.watch('*.js', ['test']);
});

// default task
gulp.task('default', [
    'lint',
    'test',
    'watch'
]);