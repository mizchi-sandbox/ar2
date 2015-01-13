Overworld = require 'overworld'
module.exports =
class extends Overworld.World
  @component : require '../component'
  @aggregator: require './aggregator'
  @subscriber: require './subscriber'
