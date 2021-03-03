namespace orange {
  export class BaseSync {
    @orange.watch serverTime = -1;
  }

  export const baseSync = new BaseSync();
}
