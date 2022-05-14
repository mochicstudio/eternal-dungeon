import DungeonManager from './DungeonManager';
import Cursors from './Cursors';
import entity from '../models/entity.model';
import Position from '../models/position.model';

export default class Entity implements entity {
  dungeonManager: DungeonManager;
  cursors: Cursors;
  position: Position;
  movePoints: number;
  restorePoints: number;
  sprite: number;

  constructor(positionX: number, positionY: number, movePoints: number, sprite: number) {
    this.dungeonManager = DungeonManager.GetInstance();
    this.cursors = Cursors.GetInstance();
    this.position = { x: positionX, y: positionY };
    this.movePoints = movePoints;
    this.restorePoints = movePoints;
    this.sprite = sprite;
    this.dungeonManager.level.map?.putTileAt(this.sprite, this.position.x, this.position.y);
  }

  Turn() { }
  Over() { }
  Refresh() { }
}