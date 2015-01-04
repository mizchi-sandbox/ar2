import Stage = require('../stages/stage');
import Entity = require('../entities/entity');

function formatPhysicsBodies(bodies: any[]){
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

function serializeEntity(entity: Entity){
  return {
    id: entity.id,
    groupId: entity.groupId,
    x: entity.x, y: entity.y,
    rad: entity.rad,
    type: (<any>entity.constructor).type
  };
}

//TODO: remove player camera controller from this function
function serialize(game, stage: Stage, target: Entity){
  var cx = target.x-320;
  var cy = target.y-240;
  var bodies = stage.physicsWorld.getBodies();
  return {
    score: game.score,
    cx: cx,
    cy: cy,
    cnt: stage.cnt,
    stage: {
      width: stage.width,
      height: stage.height
    },
    entities: stage.entities.map(e => serializeEntity(e)),
    focus: game.inputBuffer.focus,
    bodies: formatPhysicsBodies(bodies)
  };
}
export = serialize;
