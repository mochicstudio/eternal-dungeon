import PF from 'pathfinding';
import Position from '../models/position.model';
import Entity from './Entity';
import { dungeonManager } from '../classes/DungeonManager';

export default class Monster extends Entity {
  type: string;

  constructor() {
    super(70, 8, 1, 26);
    this.type = 'Monster';
  }

  Turn() {
    let previousPosition: Position = {
      x: this.position.x,
      y: this.position.y
    };

    if (this.movePoints > 0) {
      const path = this.GetPath(previousPosition);
      if (path.length > 2) {
        this.MoveEntityTo({ x: path[1][0], y: path[1][1] });
      }
      this.movePoints -= 1;
    }

    if (this.actionPoints > 0 && this.IsPlayerReachable()) {
      // dungeonManager.AttackEntity(this, dungeonManager.player);
      this.actionPoints -= 1;
    }
  }

  Refresh() {
    this.movePoints = 1;
    this.actionPoints = 1;
  }

  Over() {
    return this.movePoints === 0 && this.actionPoints === 0 && !this.isMoving;
  }

  Attack() {
    return 1;
  }

  OnDestroy() {
    console.log('killed', this);
  }

  GetPath(position: Position): number[][] | any {
    const grid = new PF.Grid(dungeonManager.level.config.data ? dungeonManager.level.config.data : []);
    const finder = new PF.AStarFinder();
    return finder.findPath(position.x, position.y, dungeonManager.player.position.x, dungeonManager.player.position.y, grid);
  }

  IsPlayerReachable(): boolean {
    // dungeonManager.distanceBetweenEntities(this, dungeonManager.player) <= 2
    return true;
  }
}