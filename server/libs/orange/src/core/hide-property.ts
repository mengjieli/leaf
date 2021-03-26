namespace orange {

  var orangeSymbol = Symbol("orange");
  var classId = 1;

  export function createHideProperty(prototype): any {
    if (!prototype[orangeSymbol]) {
      Object.defineProperty(prototype, orangeSymbol, {
        enumerable: false,
        writable: false,
        configurable: false,
        value: {
          uuid: classId++
        }
      });
    }
    return prototype[orangeSymbol];
  }

  export function getHideProperty(prototype): any {
    return prototype[orangeSymbol];
  }
}

namespace orange {

  export function addAutorun(prototype: any, call: () => any) {
    let value = createHideProperty(prototype);
    value.constructorCalls || (value.constructorCalls = []);
    value.constructorCalls.push(call);
  }
}