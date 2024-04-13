// diff between just two arrays:
export function arrayDiff(a, b) {
  return [
    ...a.filter((x) => b.indexOf(x) === -1),
    ...b.filter((x) => a.indexOf(x) === -1),
  ];
}

// diff between multiple arrays:
export function arrayMultipleDiff(...arrays) {
  return [].concat(
    ...arrays.map((arr, i) => {
      const others = arrays.slice(0);
      others.splice(i, 1);
      const unique = [...new Set([].concat(...others))];
      return arr.filter((x) => unique.indexOf(x) === -1);
    })
  );
}
export function arrayMissing(prev, current) {
  /**
     * var current = [1, 2, 3, 4],
        prev = [1, 2, 4],
        missing = null;
     * 
     */
  var missing = null;
  var i = 0;
  for (i = 0; i < current.length; i++) {
    if (prev.indexOf(current[i]) == -1) missing = current[i];
  }
  return missing;
}
