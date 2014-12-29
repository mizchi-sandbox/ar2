Entity = require '../entity'

module.exports =
class Battler extends Entity
  @type: 'battler'

  suffer: (damage) ->
    @life -= damage if @life > 0
