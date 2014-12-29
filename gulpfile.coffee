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

gulp.task 'build:webpack', ->
  gulp.src('lib/index.js')
  .pipe(webpack(webpackConfig))
  .pipe(gulp.dest('.'))

gulp.task 'build:jade', ->
  gulp.src('src/**/*.jade')
    .pipe(gulp.dest('lib'))

## Watch tasks
gulp.task 'watch', ['build'], ->
  gulp.watch 'src/**/*.coffee', ['build:coffee']
  gulp.watch 'src/**/*.ts', ['build:ts']
  gulp.watch 'src/**/*.jade', ['build:jade']
  gulp.watch 'lib/**/*.js', ['build:webpack']

gulp.task 'build', ['build:coffee', 'build:jade', 'build:ts', 'build:webpack']
gulp.task 'default', ['build']

## Deploy tasks
gulp.task 'prepare-deploy', ['build'], ->
  gulp.src('public/**/*')
    .pipe(gulp.dest('deploy'))
