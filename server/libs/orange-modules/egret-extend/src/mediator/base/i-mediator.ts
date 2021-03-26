namespace egretExtend {

  export interface IMediator {

    /**
     * mediator 的名称，唯一标识，用以解耦
     */
    readonly name: string;

    onReady(): void;
  }
}