# requires
window.app = null
require './setup'
require './router'

Game = require './game/core'
window.game = Game.getInstance()
window.addEventListener 'DOMContentLoaded', ->
  app.mount(document.body)

  app.transition('opening', {})
