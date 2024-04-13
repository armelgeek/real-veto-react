import assertNotArray from "../utils/assertNotArray";
import makeScope from "../utils/makeScope";
;

export default function invariants(
  baseArgs,
  extraArgs
) {
  var config = extraArgs.config;

  if (!config.resourceName) throw new Error("Expected config.resourceName");

  const scope = makeScope(config, baseArgs.reducerName);

  if (!config.key) throw new Error(scope + ": Expected config.key");
  if (!extraArgs.record) throw new Error(scope + ": Expected record/s");

  extraArgs.assertValidStore(scope, extraArgs.current);

  if (!baseArgs.canBeArray) {
    assertNotArray(extraArgs.config, baseArgs.reducerName, extraArgs.record);
  }

 // assertHasKey(extraArgs.config, scope, extraArgs.record);
}
