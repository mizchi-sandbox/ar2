extend = require 'extend'
template = require './template.jade'


getMainRect = do ->
  main = document.querySelector '.main'
  rect = null
  ->
    main ?= document.querySelector '.main'
    rect ?= main.getBoundingClientRect()

module.exports = React.createClass
  mixins: [Overworld.mixinFor(-> app)]

  onMouseMove: (e) ->
    rect = getMainRect()
    x = e.clientX - rect.left
    y = e.clientY - rect.top
    game?.emit 'io:update-focus', {x, y}
    console.log x, y
    return

  render: ->
    template extend {}, @, @props, @state
