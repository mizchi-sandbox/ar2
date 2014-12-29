module.exports =
class extends Overworld.World
  @component : require '../../components/opening'
  @aggregator: require './aggregator'
  @subscriber: require './subscriber'
