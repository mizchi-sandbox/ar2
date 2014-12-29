template = require './template.jade'
actions  = require './actions'
extend   = require 'extend'

module.exports = React.createClass
  mixins: [Overworld.mixinFor(-> app), actions]
  render: ->
    template extend {}, @, @props, @state
