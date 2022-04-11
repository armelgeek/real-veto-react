import * as is from "ramda/src/is"

import makeScope from "./makeScope";

export default function(config, reducerName, record) {
  var scope = makeScope(config, reducerName);
  var isArray = is(Array, record);

  if (isArray)
    throw new TypeError(scope + ": Expected record not to be an array");
}
