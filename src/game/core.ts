global.EventEmitter = require('events').EventEmitter;
declare var app: any;

/*vr global = require 'global'*/
import Player = require('./entities/battlers/player');
import Stage = require('./stages/stage');
import BattleStage = require('./stages/battle-stage');

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
    this.player.x = 100;
    this.player.y = 100;
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

  private formatPhysicsBodies(bodies: any[]){
    return bodies.map(b => {
      var obj:any = {
        name: b.name,
        pos: b.state.pos.values(),
        angle: b.state.angular.pos
      }
      if(b.name === 'circle'){
        obj.radius = b.radius;
      } else if(b.name === 'rectangle'){
        obj.width = b.width;
        obj.height = b.height;
        obj.x = b.x;
        obj.y = b.y;
      } else if(b.name === 'convex-polygon'){
        obj.vertices = b.geometry.vertices;
      }
      return obj;
    });
  }

  serialize(){
    var target = this.player;
    var cx = target.x-320;
    var cy = target.y-240;
    var bodies = this.stage.physicsWorld.getBodies();
    return {
      score: this.score,
      cx: cx,
      cy: cy,
      cnt: this.stage.cnt,
      entities: this.stage.entities.map(e => e.serialize()),
      focus: this.inputBuffer.focus,
      bodies: this.formatPhysicsBodies(bodies)
    };
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
