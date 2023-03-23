type IsAliveFunction = () => boolean;

interface Alive {
  healthPoints: number,
  isAliveFunction: IsAliveFunction
}

export default Alive;
