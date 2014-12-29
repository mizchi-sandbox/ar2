module.exports =
class extends Overworld.World
  @component : require '../../components/menu'
  @aggregator: require './aggregator'
  @subscriber: require './subscriber'
