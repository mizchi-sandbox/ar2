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

  step: ->
    # console.log 'update:', @id

  isAlive: -> true
  isDead: -> not @isAlive()

  dispose: ->

  serialize: ->
    {
      @x
      @y
      @rad
      type: @constructor.type
    }
