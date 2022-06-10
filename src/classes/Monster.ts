import PF from 'pathfinding';
import Position from '../models/position.model';
import Entity from './Entity';

export default class Monster extends Entity {
  constructor() {
    super(17, 17, 1, 26);
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
  }

  Refresh() {
    this.movePoints = 1;
  }

  Over() {
    return this.movePoints === 0 && !this.isMoving;
  }

  GetPath(position: Position): number[][] | any {
    // const grid = new PF.Grid(this.dungeonManager1.level.config.data ? this.dungeonManager1.level.config.data : []);
    // const finder = new PF.AStarFinder();
    // return finder.findPath(position.x, position.y, this.dungeonManager1.player.position.x, this.dungeonManager1.player.position.y, grid);
  }
}