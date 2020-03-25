

export function removeElementFromArray(array: any[], element: any, uniqueFieldName: string) {
  const index = array.findIndex((e) => e[uniqueFieldName] === element[uniqueFieldName]);
  if (index >= 0) {
    array.splice(array.findIndex((e) => e[uniqueFieldName] === element[uniqueFieldName]), 1);
  }
}

export function removeFromArray(array: any[], elements: any[], uniqueFieldName: string) {
  for (const element of elements) {
    removeElementFromArray(array, element, uniqueFieldName);
  }
}

export function addToArray(array: any[], elements: any[]) {
  for (const element of elements) {
    array.push(element);
  }
}
