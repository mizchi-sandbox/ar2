extend = require 'extend'
template = require './template.jade'

module.exports = React.createClass
  mixins: [Overworld.mixinFor(-> app), require './actions']

  render: ->
    template extend {}, @, @props, @state
