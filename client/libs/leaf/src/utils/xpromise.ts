namespace leaf {


  export class XPromise<T> {

    private resolve: (t: T) => any;
    private reject: (r?: any) => any;
    private state = 0;
    private args: any;

    init(call: (resolve, reject?) => any) {
      this.state = 0;
      this.resolve = null;
      this.reject = null;
      call(this.onComplete, this.onFail);
    }

    then(resolve: (t?: T) => any) {
      if (this.state) {
        if (this.state === 1) {
          resolve(this.args);
        }
      } else {
        this.resolve = resolve;
      }
      return this;
    }

    catch(reject: (r?: any) => any) {
      if (this.state) {
        if (this.state === 2) {
          reject(this.args);
        }
      } else {
        this.reject = reject;
      }
      return this;
    }

    /**
     * @internal
     * @param t 
     */
    private onComplete = (t: T) => {
      this.state = 1;
      this.args = t;
      let r = this.resolve;
      this.resolve = null;
      this.reject = null;
      // ecs.ObjectPools.releaseRecyableObject(this);
      if (r) {
        r(t);
      }
    }

    /**
     * @internal
     * @param reason 
     */
    private onFail = (reason?: any) => {
      this.state = 2;
      this.args = reason;
      let r = this.reject;
      this.resolve = null;
      this.reject = null;
      // ecs.ObjectPools.releaseRecyableObject(this);
      if (r) {
        r(reason);
      }
    }


  }

}