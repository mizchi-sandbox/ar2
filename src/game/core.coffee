{EventEmitter} = require 'events'

global = require 'global'
Player = require './entities/battlers/player'
Enemy = require './entities/battlers/enemies/enemy'
Stage = require './stages/stage'

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
    console.log 'player', Player
    @player = new Player @inputBuffer
    @fps = ~~(1000/60)

    @on 'io:update-focus', (mouseState) =>
      @updateFocus mouseState

    @on 'io:update-key', (key, val) =>
      @updateKey key, val

  createNewStage: ->
    @stage = new Stage
    @stage.entities.push @player

    [[250, 200], [400, 100], [100, 450]].forEach ([x, y]) =>
      enemy = new Enemy
      enemy.x = x
      enemy.y = y
      @stage.entities.push enemy

  updateKey: (key, val) ->
    unless @inputBuffer[key]?
      throw key+'is unknown'
    @inputBuffer[key] = val

  updateFocus: (mouseState) ->
    @inputBuffer.focus.x = mouseState.x+@player.x-320
    @inputBuffer.focus.y = mouseState.y+@player.y-240

  serialize: ->
    target = @player
    cx = target.x-320
    cy = target.y-240

    cx: cx
    cy: cy
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

  pause: ->
    @running = false
