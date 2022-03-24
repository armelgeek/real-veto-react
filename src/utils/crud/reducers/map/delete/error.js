import * as omit from "ramda/src/omit"
import * as merge from "ramda/src/merge"

import constants from "../../../constants";
import invariants from "../invariants";

var reducerName = constants.REDUCER_NAMES.DELETE_ERROR;
var invariantArgs = {
  reducerName,
  canBeArray: false
};

export default function error(
  config,
  current,
  record
){
  invariants(invariantArgs, config, current, record);

  var key = config.key;
  var deleteId = record[key];

  // Find the record
  var deleteRecord = current[deleteId];

  if (deleteRecord == null) {
    return current;
  } else {
    // Remove deleted and busy
    deleteRecord = omit(["deleted", "busy"], deleteRecord);

    return merge(current, {[deleteId]: deleteRecord});
  }
}
