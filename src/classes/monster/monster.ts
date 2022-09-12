import PF from 'pathfinding';
import { ui } from '../../scenes/ui.scene';
import Entity from '../entity';
import { dungeonManager } from '../dungeon-manager';
import Position from '../../models/position.model';
import { getRandomNumber } from '../../utils/random-number-generator.util';

export default class Monster extends Entity {
  type: string;

  constructor(position: Position, movePoints: number, tile: number) {
    super(position.x, position.y, movePoints, tile);
    this.type = 'monster';
  }

  turn() {
    let previousPosition: Position = {
      x: this.position.x,
      y: this.position.y
    };

    if (this.movePoints > 0) {
      const path = this.getPath(previousPosition);
      if (path.length > 2) {
        this.moveEntityTo({ x: path[1][0], y: path[1][1] });
      }
      this.movePoints -= 1;
    }

    if (this.actionPoints > 0 && this.isPlayerReachable()) {
      dungeonManager.attackEntity(this, dungeonManager.player);
      this.actionPoints = 0;
    }

    this.isMoving = false;
  }

  over() {
    const isOver = this.movePoints === 0 && !this.isMoving;

    if (isOver && this.uiText) {
      this.uiText.setColor('#CFC6B8');
    } else {
      this.uiText.setColor('#FFF');
    }

    return isOver;
  }

  refresh() {
    this.movePoints = 1;
    this.actionPoints = 1;
  }

  attack() { return getRandomNumber(2, 3); }

  onDestroy() {
    dungeonManager.log('monster killed');
    this.uiSprite.setAlpha(0.2);
    this.uiText.setAlpha(0.2);
  }

  getPath(position: Position): number[][] | any {
    const grid = new PF.Grid(dungeonManager.level.config.data ? dungeonManager.level.config.data : []);
    const finder = new PF.AStarFinder();
    return finder.findPath(position.x, position.y, dungeonManager.player.position.x, dungeonManager.player.position.y, grid);
  }

  isPlayerReachable(): boolean { return dungeonManager.distanceBetweenEntities(this, dungeonManager.player) <= 2; }

  renderUI(position: Position): number {
    this.uiSprite = ui.add.sprite(position.x + 5, position.y, 'world', this.spriteTile);
    this.uiText = ui.add.text(position.x + 20, position.y - 7, 'entity', { font: '14px Arial', color: '#CFC6B8' });
    return 30;
  }
}