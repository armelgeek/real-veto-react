import * as dissoc from "ramda/src/dissoc"
import * as lensProp from "ramda/src/lensProp"
import * as set from "ramda/src/set"

import constants from "../../../constants";
import invariants from "../invariants";
var reducerName = constants.REDUCER_NAMES.CREATE_SUCCESS;
var invariantArgs = {
  reducerName,
  canBeArray: false
};

export default function success(
  config,
  current,
  addedRecord,
  clientGeneratedKey,
) {
  invariants(invariantArgs, config, current, addedRecord);

  var key = config.key;
  var addedRecordKey = addedRecord[key];
  var addedRecordKeyLens = lensProp(addedRecordKey);
  var currentWithoutClientGeneratedKey = dissoc(clientGeneratedKey, current);

  return set(
    addedRecordKeyLens,
    addedRecord,
    currentWithoutClientGeneratedKey
  );
}
