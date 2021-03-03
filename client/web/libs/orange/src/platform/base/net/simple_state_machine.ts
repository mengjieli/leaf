namespace orange {
	export class SimpleStateMachine<T extends number> {
		private states: any = {};
		private state: SimpleStateMachineState<T>;
		curState: T;
		preState: T;
		firstUpdate: boolean;

		public constructor() {
		}

		public register(state: T, enter: Function, exit: Function, update: Function) {
			this.states[state] = new SimpleStateMachineState<T>(state, enter, exit, update);
		}

		public registerBehaviour(state: T, stateBehaviour: ISimpleStateMachineStateBehaviour) {
			this.states[state] = new SimpleStateMachineState<T>(state, stateBehaviour.onEnter, stateBehaviour.onExit, stateBehaviour.onUpdate);
		}

		public changeState(state: T) {
			if (this.state && this.state.exit) {
				this.state.exit();
			}

			this.preState = this.curState;
			this.curState = state;
			this.state = this.states[state];
			this.firstUpdate = true;
			if (this.state) {
				this.state.enter();
			}
		}

		public update() {
			if (this.state && this.state.update) {
				this.state.update();
			}
			this.firstUpdate = false;
		}
	}

	export interface ISimpleStateMachineStateBehaviour {
		onEnter()
		onExit()
		onUpdate()
	}

	export class SimpleStateMachineState<T extends number> {
		state: T;
		enter: Function;
		exit: Function;
		update: Function;
		public constructor(state: T, enter: Function, exit: Function, update: Function) {
			this.state = state;
			this.enter = enter;
			this.exit = exit;
			this.update = update;
		}
	}
}