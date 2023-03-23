type OnDestroyFunction = () => void;

interface Destroyable {
  onDestroy: OnDestroyFunction
}

export default Destroyable;
