gulp = require 'gulp'
shell = require 'gulp-shell'
coffee = require 'gulp-coffee'

gulp.task 'build:ts', shell.task [
  'tsc -m commonjs --target es5 --outDir lib src/entry.ts'
]

gulp.task 'build:coffee', ->
  gulp.src('./src/**/*.coffee')
  .pipe(coffee())
  .pipe(gulp.dest('./lib'))

gulp.task 'watch', ['build'], ->
  gulp.watch 'src/**/*.ts', ['build:ts']
  gulp.watch 'src/**/*.coffee', ['build:coffee']

gulp.task 'build', ['clear', 'build:ts', 'build:coffee']
gulp.task 'default', ['build']

gulp.task 'clear', shell.task [
  'rm -r lib'
]
