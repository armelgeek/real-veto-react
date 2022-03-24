import * as forEach from "ramda/src/forEach"

import wrapArray from "../../utils/wrapArray";

export default function assertHasKey(
  config,
  scope,
  recordOrRecords,
) {
  var key = config.key;
  var records = wrapArray(recordOrRecords);

  forEach(function(record) {
    if (record[key] == null) {
      throw new Error(scope + ": Expected record to have ." + key);
    }
  })(records);
}
