import Entity from './entity.model';

type AttackFunction = (victim: Entity) => boolean;
type AttackCallbackFunction = (victim: Entity) => boolean;
type GetAttackPointsFunction = () => number;

interface CanAttack {
  attack: AttackFunction,
  attackCallback: AttackCallbackFunction,
  getAttackPoints: GetAttackPointsFunction
}

export default CanAttack;
