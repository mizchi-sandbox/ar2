EventEmitter = require 'events'

module.exports =
class Stage extends EventEmitter
  constructor: (@player) ->
    @cnt = 0
    @entities = []

  update: -> new Promise (done) =>
    @cnt++

    @entities.filter (e) -> e.constructor.type is 'enemy' and e.isAlive()
      .forEach (enemy) =>
        for bullet in @entities when bullet.constructor.type is 'bullet'
          return if enemy.isDead()
          if (
            bullet.x - 15 <= enemy.x <= bullet.x + 15 and
            bullet.y - 15 <= enemy.y <= bullet.y + 15
          )
            enemy.suffer()

    Promise.all(@entities.map (e) -> e.step()).then =>
      @entities = @entities.filter (e) -> e.isAlive()
      done()
