
export function compareArrays(a: any[], b: any[], uniqueFieldName: string, ignoreOrder = false): boolean {
    if (a.length !== b.length) {
        return false;
    }
    if (ignoreOrder) {
        return compareArraysIgnoringOrder(a, b, uniqueFieldName);
    } else {
        for (let i = 0; i < a.length; i++) {
            if (a[i][uniqueFieldName] !== b[i][uniqueFieldName]) {
                return false;
            }
        }
        return true;
    }
}

function compareArraysIgnoringOrder(a: any[], b: any[], uniqueFieldName: string): boolean {
    const map = mapFromArray(a, uniqueFieldName);
    for (const item of b) {
        if (map[item[uniqueFieldName]] === uniqueFieldName) {
            return false;
        }
    }
    return true;
}

export function compareArrayElementsChanges(a: any[], b: any[], uniqueFieldName: string): {added: any[], removed: any[]} {
    const mapA = mapFromArray(a, uniqueFieldName);
    const mapB = mapFromArray(b, uniqueFieldName);
    const added = [];
    const removed = [];
    for (const item of a) {
        if ((mapB[item[uniqueFieldName]] === undefined)) {
            removed.push(item);
        }
    }
    for (const item of b) {
        if ((mapA[item[uniqueFieldName]] === undefined)) {
            added.push(item);
        }
    }
    return { added, removed };
}

export function mapFromArray(array: any[], uniqueFieldName: string): any {
    const map = {};
    for (const item of array) {
        map[item[uniqueFieldName]] = item;
    }
    return map;
}