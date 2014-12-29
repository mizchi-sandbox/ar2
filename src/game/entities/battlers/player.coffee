Bullet = require '../objects/bullets/bullet'
Battler = require './battler'

module.exports =
class Player extends Battler
  @type: 'player'
  constructor: (@inputBuffer) ->
    super

  step: ->
    speed = 4

    nx = @x
    ny = @y
    # update pos
    if @inputBuffer.left
      nx -= speed
    else if @inputBuffer.right
      nx += speed

    if @inputBuffer.up
      ny -= speed
    else if @inputBuffer.down
      ny += speed

    @x = nx
    @y = ny

    # update rad
    mx = @inputBuffer.focus.x
    my = @inputBuffer.focus.y
    @rad = Math.atan2(my-ny, mx-nx) # + Math.PI/2

    if @inputBuffer.mouseLeft
      bullet = (new Bullet @x, @y, @rad)
      game.stage.entities.push bullet

    if @inputBuffer.mouseRight
      bullet = (new Bullet mx, my, @rad)
      game.stage.entities.push bullet
