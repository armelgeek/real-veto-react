import * as is from "ramda/src/is"

export default function assertValidStore(
  scope,
  current
) {
  if (!is(Object, current))
    throw new Error(scope + ": Expected current to be an object");
}
