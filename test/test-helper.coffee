global = require 'global'
global.Promise = require 'bluebird'
global.React = require 'react'
global.Overworld = require 'overworld'
Overworld.setReact React

# require jade
jade = require('react-jade')
require.extensions['.jade'] = (module, filename) ->
  module.exports = jade.compileFile(filename)
