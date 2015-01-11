# requires
window.app = null
require './setup'
require './router'

Game = require '../domains/battlefield'
window.game = Game.getInstance()

window.addEventListener 'DOMContentLoaded', ->
  app.mount(document.body)
  app.transition('opening', {})
