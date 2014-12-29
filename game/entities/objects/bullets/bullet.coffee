Entity = require '../../entity'

module.exports =
class Bullet extends Entity
  @type: 'bullet'
  constructor: (x, y, rad) ->
    super
    @x = x
    @y = y
    @rad = rad
    @life = 40

  step: ->
    speed = 8
    @x += Math.cos(@rad) * speed
    @y += Math.sin(@rad) * speed
    @life-- if @life > 0

  isAlive: ->
    @life > 0
