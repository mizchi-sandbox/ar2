# requires
window.app = null
require './setup'
require './router'

Game = require '../game/core'
game = Game.getInstance()
window.addEventListener 'DOMContentLoaded', ->
  app.mount(document.body)

  app.transition('main', {}).then =>
    game.createNewStage()
    game.start()
