type ReceiveDamageFunction = (damage: number) => void;

interface CanBeDamaed {
  receiveDamage: ReceiveDamageFunction
}

export default CanBeDamaed;
