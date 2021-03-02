export function findArrayItem(array: any[], key: string, value: any): any {
  for (let item of array) {
    if (item[key] == value) {
      return item;
    }
  }
  return null;
}