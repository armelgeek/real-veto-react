import * as is from "ramda/src/is"

export default function assert(scope, current) {
  var isArray = is(Array, current);
  if (!isArray) throw new Error(scope + ": Expected current to be an array");
}
