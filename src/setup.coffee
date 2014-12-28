# requires
global = require 'global'
global.Promise = require 'bluebird'
global.React = require 'react'
global.Overworld = require 'overworld'
Overworld.setReact React

global.portal = new Overworld.Portal
