export default class TurnManager {
	private static instance: TurnManager;
	private readonly interval: number;
	private lastCall: number;
	private entities: Set<any>;

	constructor() {
		this.interval = 150;
		this.lastCall = Date.now();
		this.entities = new Set();
	}

	static GetInstance(): TurnManager {
		if (TurnManager.instance) {
			return this.instance;
		}
		this.instance = new TurnManager();
		return this.instance;
	}

	AddEntity(entity: any) {
		this.entities.add(entity);
	}

	RemoveEntity(entity: any) {
		this.entities.delete(entity);
	}

	Turn() {
		let now = Date.now();
		let limit = this.lastCall + this.interval;

		if (now > limit) {
			for (let entity of this.entities) {
				if (!entity.over()) {
					entity.turn();
					break;
				}
			}
			this.lastCall = Date.now();
		}
	}
}