module.exports =
class Main extends Overworld.World
  @component : require '../../components/main'
  @aggregator: require './aggregator'
  @subscriber: require './subscriber'
