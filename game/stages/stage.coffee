EventEmitter = require 'events'

module.exports =
class Stage extends EventEmitter
  constructor: (@player) ->
    @cnt = 0
    @entities = []

  update: -> new Promise (done) =>
    @cnt++

    # TODO 計算量の圧縮と衝突判定すり抜け対策
    @entities
      .filter (e) -> e.isAttackable() and e.isAlive()
      .forEach (attacker) =>
        for target in @entities when attacker.canAttackTo target
          attacker.attack target
          return if attacker.isDead()

    Promise.all(@entities.map (e) -> e.step()).then =>
      @entities = @entities.filter (e) -> e.isAlive()
      done()
