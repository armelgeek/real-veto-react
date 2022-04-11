import * as reject from "ramda/src/reject"

import invariants from "../invariants";
import constants from "../../../constants";


var reducerName = constants.REDUCER_NAMES.DELETE_SUCCESS;
var invariantArgs = {
  reducerName,
  canBeArray: false
};

export default function success(
  config,
  current,
  record
) {
  invariants(invariantArgs, config, current, record);

  var key = config.key;
  var deleteId = record[key];

  function predicate(existingRecord) {
    return deleteId == existingRecord[key];
  }

  return reject(predicate, current);
}
