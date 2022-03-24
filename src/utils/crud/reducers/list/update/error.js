import {prepareRecord} from "../../common/update/error";
import constants from "../../../constants";
import findByKey from "../../../utils/findByKey";
import invariants from "../invariants";
import store from "../store";

var reducerName = constants.REDUCER_NAMES.UPDATE_ERROR;
var invariantArgs = {
  reducerName,
  canBeArray: false
};

export default function error(
  config,
  current,
  record
) {
  invariants(invariantArgs, config, current, record);

  // We don"t want to rollback
  var key = config.key;
  var updatedId = record[key];
  var updatedRecord = findByKey(current, key, updatedId);

  if (updatedRecord == null) return current;

  updatedRecord = prepareRecord(updatedRecord);

  return store.merge(current, updatedRecord, key);
}
