# requires
global = require 'global'
global.Promise = require 'bluebird'
global.React = require 'react'
global.Overworld = require 'overworld'
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
  console.log e.keyCode

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
