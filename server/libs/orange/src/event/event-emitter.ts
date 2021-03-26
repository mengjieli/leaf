namespace orange {

  export interface IEventEmitter {

    readonly target: any;

    on(type: string, back: (e: orange.Event) => void, owner?: any): void;

    once(type: string, back: (e: orange.Event) => void, owner?: any): void;

    removeListener(type: string, back: (e: orange.Event) => void, owner?: any): void;

    hasListener(type: string): boolean;

    removeAllListeners();

    emit(event: Event);

    emitWith(type: string, data?: any);
  }

  export class EventEmitter extends HashObject implements IEventEmitter {

    constructor(target?: any) {
      super();
      this._target = target || this;
    }

    /**
     * @internal
     */
    _target: any;

    get target(): any {
      return this._target;
    }

    on(event: string, back: (e: orange.Event) => void, owner?: any): void {
      orange.on(this.target, event, back, owner || this);
    }

    once(event: string, back: (e: orange.Event) => void, owner?: any): void {
      orange.once(this.target, event, back, owner || this);
    }

    emit(event: Event) {
      orange.emit(this.target, event);
    }

    emitWith(type: string, data?: any) {
      orange.emitWith(this.target, type, data);
    }

    hasListener(event: string): boolean {
      return orange.hasListener(this.target, event);
    }

    removeListener(event: string, back: (e: orange.Event) => void, owner?: any): void {
      orange.removeListener(this.target, event, back, owner || this);
    }

    removeAllListeners() {
      orange.removeAllListeners(this.target);
    }
  }
}