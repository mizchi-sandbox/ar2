EventEmitter = require 'events'

module.exports =
class Stage extends EventEmitter
  constructor: (@player) ->
    @cnt = 0
    @entities = []

  update: -> new Promise (done) =>
    @cnt++
    Promise.all(@entities.map (e) -> e.step()).then =>
      @entities = @entities.filter (e) -> e.isAlive()
      done()
