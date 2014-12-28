uuid = require 'node-uuid'
clone = require 'clone'
{EventEmitter} = require 'events'
global = require 'global'

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

class Battler extends Entity
  @type: 'battler'

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

class Stage extends EventEmitter
  constructor: (@player) ->
    @cnt = 0
    @entities = []

  update: -> new Promise (done) =>
    @cnt++
    Promise.all(@entities.map (e) -> e.step()).then =>
      @entities = @entities.filter (e) -> e.isAlive()
      done()

module.exports =
class Game extends EventEmitter
  instance = null
  queues = []

  @getInstance: ->
    instance ?= new Game

  @getActiveStage: ->
    @getInstance()?.stage

  constructor: ->
    global.game = @
    @stage = null

    @inputBuffer = {
      left: false
      right: false
      up: false
      down: false

      mouseLeft: false
      mouseRight: false
      focus: {x: 0, y: 0}
    }
    @player = new Player @inputBuffer
    @fps = ~~(1000/60)

    @on 'io:update-focus', (mouseState) =>
      @updateFocus mouseState

    @on 'io:fire-right', (mouseState) =>
      @inputBuffer.focus.rightWaiting = true

    @on 'io:update-key', (key, val) =>
      @updateKey key, val

  createNewStage: ->
    @stage = new Stage
    @stage.entities.push @player

  updateKey: (key, val) ->
    unless @inputBuffer[key]?
      throw key+'is unknown'
    @inputBuffer[key] = val

  updateFocus: (mouseState) ->
    @inputBuffer.focus.x = mouseState.x
    @inputBuffer.focus.y = mouseState.y

  serialize: ->
    cnt: @stage.cnt
    entities: @stage.entities.map (e) -> e.serialize()
    focus: @inputBuffer.focus

  start: ->
    if @running
      console.info 'game already running'
      return
    @running = true

    unless @stage?
      throw 'you should initialize stage first'

    do fn = =>
      return unless @running
      beforeUpdate = Date.now()
      @stage.update().then =>
        emitter = app?.getActiveEmitter()
        emitter.emit 'stage:update', @serialize()
        afterUpdate = Date.now()
        setTimeout fn, @fps-(afterUpdate-beforeUpdate)

  stop: ->
    @running = false
