import {prepareRecord} from "../../common/delete/start";
import invariants from "../invariants";
import constants from "../../../constants";
import store from "../store";

var reducerName = constants.REDUCER_NAMES.DELETE_START;
var invariantArgs = {
  reducerName,
  canBeArray: false
};

export default function start(
  config,
  current,
  record
) {
  invariants(invariantArgs, config, current, record);

  var key = config.key;
  var deleteId = record[key];
  var deleteRecord = current[deleteId];

  if (deleteRecord == null) {
    return current;
  } else {
    deleteRecord = prepareRecord(deleteRecord);

    return store.merge(config, current, deleteRecord);
  }
}
