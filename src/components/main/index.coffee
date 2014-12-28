extend = require 'extend'
template = require './template.jade'

module.exports = React.createClass
  mixins: [Overworld.mixinFor(-> portal)]
  onClick: ->
    @emit 'main:update', Date.now().toString()

  render: ->
    template extend {}, @, @props, @state
