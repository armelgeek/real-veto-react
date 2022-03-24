import {prepareRecord} from "../../common/update/error";
import constants from "../../../constants";
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
  var updatedRecord = current[updatedId];

  if (updatedRecord == null) return current;

  updatedRecord = prepareRecord(updatedRecord);

  return store.merge(config, current, updatedRecord);
}
