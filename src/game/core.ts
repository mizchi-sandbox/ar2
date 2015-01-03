global.EventEmitter = require('events').EventEmitter;
declare var app: any;

/*vr global = require 'global'*/
import Player = require('./entities/battlers/player');
import Stage = require('./stages/stage');
import BattleStage = require('./stages/battle-stage');
import serialize = require('./utils/serialize');

var clone = require('clone');

var instance;
export = Game;
class Game extends EventEmitter {
  static instance: Game = null
  score: number = 0; // temporary game logic
  addScore(n: number) {this.score+=n;}

  player: Player;
  inputBuffer: any;
  stage: Stage;
  fps: number;
  running: boolean;

  static getInstance(): Game {
    if(this.instance == null)
      this.instance = new Game();
    return this.instance;
  }

  static getActiveStage(): Stage {
    return this.getInstance().stage;
  }

  constructor(){
    super();
    global.game = this;
    this.stage = null
    this.inputBuffer = {
      left: false,
      right: false,
      up: false,
      down: false,
      mouseLeft: false,
      mouseRight: false,
      focus: {x: 0, y: 0}
    }
    this.player = new Player(this.inputBuffer);
    this.player.setPosition(100, 100);
    this.fps = ~~(1000/60);

    this.on('io:update-focus', (pos) => {
      this.updateFocus(pos);
    });

    this.on('io:update-key', (key, val) => {
      this.updateKey(key, val);
    });
  }

  updateKey(key, val){
    /*if(this.inputBuffer[key] == null)
      throw key+'is unknown';*/
    this.inputBuffer[key] = val;
  }

  updateFocus(pos){
    this.inputBuffer.focus.x = pos.x+this.player.x-320;
    this.inputBuffer.focus.y = pos.y+this.player.y-240;
  }

  createNewStage(){
    this.stage = new BattleStage
    this.stage.addChild(this.player);
  }

  public serialize(){
    return serialize(this, this.stage, this.player);
  }

  start(){
    if(this.running){
      console.info('game already running');
      return;
    }
    this.running = true;

    if(this.stage == null)
      throw 'you should initialize stage first';

    var fn = () => {
      if(!this.running) return;

      var beforeUpdate = Date.now();
      this.stage.update().then(() => {
        var emitter = app.getActiveEmitter();
        emitter.emit('stage:update', this.serialize());
        var afterUpdate = Date.now();
        setTimeout(fn, this.fps-(afterUpdate-beforeUpdate));
      });
    }
    fn();
  }

  pause(){
    this.running = false;
  }

}
