import PF from 'pathfinding';
import Position from '../models/position.model';
import Entity from './entity';
import { dungeonManager } from './dungeon-manager';
import { getRandomNumber } from '../utils/random-number-generator.util';

export default class Monster extends Entity {
  constructor(position: Position, movePoints: number, tile: number) {
    super(position.x, position.y, movePoints, tile);
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
      dungeonManager.AttackEntity(this, dungeonManager.player);
      this.actionPoints = 0;
    }

    this.isMoving = false;
  }

  Refresh() {
    this.movePoints = 1;
    this.actionPoints = 1;
  }

  Attack() { return getRandomNumber(2, 3); }

  OnDestroy() { console.log('monster killed', this); }

  GetPath(position: Position): number[][] | any {
    const grid = new PF.Grid(dungeonManager.level.config.data ? dungeonManager.level.config.data : []);
    const finder = new PF.AStarFinder();
    return finder.findPath(position.x, position.y, dungeonManager.player.position.x, dungeonManager.player.position.y, grid);
  }

  IsPlayerReachable(): boolean { return dungeonManager.DistanceBetweenEntities(this, dungeonManager.player) <= 2; }
}