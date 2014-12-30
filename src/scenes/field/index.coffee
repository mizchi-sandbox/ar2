module.exports =
class Field extends Overworld.World
  @component : require '../../components/field'
  @aggregator: require './aggregator'
  @subscriber: require './subscriber'
