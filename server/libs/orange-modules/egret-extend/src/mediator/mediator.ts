namespace egretExtend {

  export abstract class Mediator implements orange.IEventEmitter, IMediator {

    abstract name: string;

    abstract onReady();

    /**
     * @internal
     */
    $target: MediatorManager;

    get target(): MediatorManager {
      return this.$target;
    }

    /**
     * @internal
     */
    _events = []

    on(type: string, back: (e: orange.Event) => void): void {
      this._events.push([this.$target, type, back, this]);
      orange.on(this.$target, type, back, this);
    }

    once(type: string, back: (e: orange.Event) => void): void {
      this._events.push([this.$target, type, back, this]);
      orange.once(this.$target, type, back, this);
    }

    removeListener(type: string, back: (e: orange.Event) => void): void {
      for (let i = 0; i < this._events.length; i++) {
        if (this._events[i][1] == type && this._events[i][2] == back) {
          this._events.splice(i, 1);
          i--;
        }
      }
      orange.removeListener(this.$target, type, back, this);
    }

    hasListener(type: string): boolean {
      for (let args of this._events) {
        if (args[1] == type) return true;
      }
      return false;
    }

    removeAllListeners(): any {
      for (let args of this._events) {
        orange.removeListener.apply(null, args);
      }
      this._events.length = 0;
    }

    emit(event: orange.Event): any {
      orange.emit(this.$target, event);
    }

    emitWith(type: string, data?: any): any {
      orange.emitWith(this.$target, type, data);
    }
  }
}