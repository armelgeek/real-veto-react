import * as merge from "ramda/src/merge"
import constants from "../../../constants";

export function prepareRecord(record) {
  var recordStatus = {
    [constants.SPECIAL_KEYS.BUSY]: true,
    [constants.SPECIAL_KEYS.PENDING_CREATE]: true
  };

  return merge(record, recordStatus);
}
