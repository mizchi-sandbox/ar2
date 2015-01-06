# requires
global = require 'global'
global.Promise = require 'bluebird'
global.React = require 'react'
global.Overworld = require 'overworld'
window.Physics = require 'PhysicsJS'

Overworld.setReact React

global.app = new Overworld.Portal

KeyMap =
  37: 'left'
  38: 'up'
  39: 'right'
  40: 'down'
  87: 'w'
  65: 'a'
  83: 's'
  68: 'd'
  73: 'i'

window.addEventListener 'keydown', (e) ->
  # console.log e.keyCode
  emitter = app.getActiveEmitter()
  return unless game
  switch KeyMap[e.keyCode]
    when 'left' , 'a' then game.emit 'io:update-key', 'left', true
    when 'up'   , 'w' then game.emit 'io:update-key', 'up',   true
    when 'right', 'd' then game.emit 'io:update-key', 'right',true
    when 'down' , 's' then game.emit 'io:update-key', 'down', true
    when 'i' then emitter.emit 'io:open-menu'

window.addEventListener 'keyup', (e) ->
  return unless game
  switch KeyMap[e.keyCode]
    when 'left' , 'a' then game.emit 'io:update-key', 'left', false
    when 'up'   , 'w' then game.emit 'io:update-key', 'up',   false
    when 'right', 'd' then game.emit 'io:update-key', 'right',false
    when 'down' , 's' then game.emit 'io:update-key', 'down', false

Physics.behavior 'constant-friction', ( parent ) ->
  defaults = {f: 0.00002}
  init: ( options ) ->
    parent.init.call( this );
    @options.defaults( defaults );
    @options( options );
    @_v = new Physics.vector();

  behave: ( data ) ->
    bodies = this.getTargets();
    f = 0.0002

    for body in bodies
      ax = 0
      ay = 0
      cof = body.cof

      if body.state.vel.x > 0
        ax -= f * cof
      else if body.state.vel.x < 0
        ax += f * cof

      if body.state.vel.y > 0
        ay -= f * cof
      else if body.state.vel.y < 0
        ay += f * cof

      @_v.clone {x: ax, y: ay}
      body.accelerate( @_v );
