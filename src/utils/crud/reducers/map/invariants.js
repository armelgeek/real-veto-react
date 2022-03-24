import invariants from "../invariants";
import store from "./store";

export default function invariantsMap(
  invariantArgs,
  config,
  current,
  record
) {
  var extra = {
    assertValidStore: store.assert,
    config,
    current,
    record
  };

  invariants(invariantArgs, extra);
}
