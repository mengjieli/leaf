/**
 * @internal
 */
namespace orange {

  var bindingID = 1;
  var bindings = {};

  export var bindProperty = function (owner: any, property: string, data: any, dataProperty: string): () => void {
    bindingID++;
    bindings[bindingID] = {
      'owner': owner,
      'property': property,
      'data': data,
      'dataProperty': dataProperty
    }
    on(data, dataProperty, setProperty, bindings[bindingID]);
    setProperty.call(bindings[bindingID]);
    return () => {
      removeListener(data, dataProperty, setProperty, bindings[bindingID]);
    };
  }

  function setProperty() {
    this.owner[this.property] = this.data[this.dataProperty];
  }
}