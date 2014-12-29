Entity = require '../entity'

module.exports =
class Battler extends Entity
  @type: 'battler'

  suffer: ->
    @life-- if @life > 0
