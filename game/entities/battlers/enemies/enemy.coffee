Bullet = require '../../objects/bullets/bullet'
Battler = require '../battler'

module.exports =
class Enemy extends Battler
  @type: 'enemy'

  constructor: ->
    super
