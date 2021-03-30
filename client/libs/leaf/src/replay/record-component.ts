namespace leaf {

  export class RecordComponent extends ecs.Component {

    recordId: number;

    init() {
      this.recordId = leaf.world.getSystem(RecordSystem).newId;
    }

    checkRecord() {

    }

    track(data?: any) {
      if (this.entity) {
        let sys = leaf.world.getSystem(RecordSystem);
        sys.track(this.recordId, data);
      }
    }

    recordReady(call: Function) {
      if (!this.entity) {
        call();
        this.checkRecord();
      } else {
        let sys = leaf.world.getSystem(RecordSystem);
        let frame = sys.recordReady(this.recordId);
        if (frame != -1) {
          sys.addCallAt(call, frame + 1);
        } else {
          call();
        }
      }
    }

    isReady() {
      return true;

    }

  }

}