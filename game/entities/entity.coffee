uuid = require 'node-uuid'
{EventEmitter} = require 'events'

module.exports =
class Entity extends EventEmitter
  @type: 'entity'
  constructor: () ->
    super
    @id = uuid()
    @x = 0
    @y = 0
    @rad = 0
    @life = 1

  step: ->
    # console.log 'update:', @id

  isAlive: -> @life > 0
  isDead: -> not @isAlive()

  dispose: ->

  serialize: ->
    {
      @x
      @y
      @rad
      type: @constructor.type
    }
