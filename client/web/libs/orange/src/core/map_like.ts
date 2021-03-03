namespace orange {
  export interface MapLike<T> {
    [key: string]: T;
    [key: number]: T;
  }
}