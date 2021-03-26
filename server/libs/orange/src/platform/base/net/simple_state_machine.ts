/**
 * @internal
 */
class SimpleStateMachine<T extends number> {
	private states:any = {};
	private state:SimpleStateMachineState<T>;
	curState: T;
	preState: T;
	firstUpdate: boolean;

	public constructor() {
	}

	public Register(state:T, enter:Function, exit:Function, update:Function) {
		this.states[state] = new SimpleStateMachineState<T>(state, enter, exit, update);
	}

	public RegisterBehaviour(state:T, stateBehaviour:ISimpleStateMachineStateBehaviour) {
		this.states[state] = new SimpleStateMachineState<T>(state, stateBehaviour.OnEnter, stateBehaviour.OnExit, stateBehaviour.OnUpdate);
	}

	public ChangeState(state:T){
		if(this.state && this.state.exit) {
			this.state.exit();
		}

		this.preState = this.curState;
		this.curState = state;
		this.state = this.states[state];
		this.firstUpdate = true;
		if(this.state) {
			this.state.enter();
		}
	}

	public Update(){
		if(this.state && this.state.update) {
			this.state.update();
		}
		this.firstUpdate = false;
	}
}

interface ISimpleStateMachineStateBehaviour {
	OnEnter()
	OnExit()
	OnUpdate()
}

class SimpleStateMachineState<T extends number> {
	state:T;
	enter:Function;
	exit:Function;
	update:Function;
	public constructor(state:T, enter:Function, exit:Function, update:Function){
		this.state = state;
		this.enter = enter;
		this.exit = exit;
		this.update = update;
	}
}