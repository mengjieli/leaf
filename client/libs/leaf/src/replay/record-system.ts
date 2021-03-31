namespace leaf {

  export class RecordSystem extends ecs.EntitySystem {

    frame: number = 0;

    private _newId = 0;

    get newId(): number {
      return this._newId++;
    }

    private isRecording: boolean = false;
    private records: { [index: number]: Record[] } = {};
    private replayRecords: { [index: number]: Record[] } = {};
    private isReplaying: boolean = false;
    private calls: { [index: number]: Function[] } = {};

    startRecord() {
      this.isRecording = true;
    }

    startReplay(replayRecords: any) {
      let nrs = {};
      for (let k in replayRecords) {
        for (let r of replayRecords[k]) {
          r.frame--;
        }
        nrs[(+k) - 1] = replayRecords[k];
      }
      replayRecords = nrs;
      this.replayRecords = replayRecords;
      this.isReplaying = true;
    }

    update() {
      this.frame++;
      if (this.calls[this.frame]) {
        for (let i = 0; i < this.calls[this.frame].length; i++) {
          this.calls[this.frame][i]();
        }
        delete this.calls[this.frame];
      }
      for (let node = this.query.head; node; node = node.next) {
        node.value.getComponent(RecordComponent).checkRecord();
      }
    }

    /**
     * @internal
     * @returns 
     */
    checkReplayReady() {
      if (this.isReplaying) {
        if (this.replayRecords[this.frame] && this.replayRecords[this.frame].length) {
          return false;
        }
      }
      return true;
    }

    track(id: number, data?: any) {
      if (this.isRecording) {
        let r = {} as Record;
        r.id = id;
        r.frame = this.frame;
        r.data = data;
        if (!this.records[this.frame]) {
          this.records[this.frame] = [];
        }
        this.records[this.frame].push(r);
      }
    }

    recordReady(id: number) {
      let recordFrame = -1;
      if (this.isReplaying) {
        for (let frame in this.replayRecords) {
          if (this.replayRecords[frame]) {
            for (let i = 0; i < this.replayRecords[frame].length; i++) {
              if (this.replayRecords[frame][i].id === id) {
                this.replayRecords[frame].splice(i, 1);
                i--;
                recordFrame = +frame;
              }
            }
            if (!this.replayRecords[frame].length) {
              delete this.replayRecords[frame];
              play();
            }
          }
        }
      }
      return recordFrame;
    }

    addCallAt(call: Function, frame: number) {
      if (this.frame < frame) {
        if (!this.calls[frame]) {
          this.calls[frame] = [];
        }
        this.calls[frame].push(call);
      } else {
        call();
      }
    }

    getRecord(id: number): Record {
      for (let k in this.records) {
        for (let r of this.records[k]) {
          if (r.id === id) return r;
        }
      }
    }

  }

  interface Record {
    id: number;
    frame: number;
    data: any;
  }

}