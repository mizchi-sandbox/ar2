gulp = require 'gulp'
coffee = require 'gulp-coffee'
webpack = require 'gulp-webpack'
shell = require 'gulp-shell'

webpackConfig = require './webpack.config'

gulp.task 'build:coffee', ->
  gulp.src('./src/**/*.coffee')
  .pipe(coffee())
  .pipe(gulp.dest('./lib'))

gulp.task 'build:ts', shell.task [
  'tsc -m commonjs --target es5 --outDir lib src/entry.ts'
]

gulp.task 'webpack', ->
  gulp.src('lib/index.js')
  .pipe(webpack(webpackConfig))
  .pipe(gulp.dest('.'))

gulp.task 'build:jade', ->
  gulp.src('src/**/*.jade')
    .pipe(gulp.dest('lib'))

## Watch tasks
gulp.task 'watch', ['build'], ->
  gulp.watch 'src/**/*.coffee', ['build:coffee']
  # gulp.watch 'src/**/*.ts', ['build:ts']
  gulp.watch 'src/**/*.jade', ['build:jade']
  gulp.watch 'lib/**/*', ['webpack']
  gulp.watch 'domains/battlefield/lib/*.js', ['webpack']

gulp.task 'build', ['clear', 'build:coffee', 'build:jade']
gulp.task 'default', ['build']

gulp.task 'clear', shell.task [
  'rm -r lib'
]

## Deploy tasks
gulp.task 'prepare-deploy', ->
  gulp.src('public/**/*')
    .pipe(gulp.dest('deploy'))

## Deploy tasks
gulp.task 'deploy', ['prepare-deploy'], shell.task [
  'git subtree push --prefix deploy/ origin gh-pages'
]
