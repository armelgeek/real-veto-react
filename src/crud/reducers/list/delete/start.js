import {prepareRecord} from "../../common/delete/start";
import constants from "../../../constants";
import findByKey from "../../../utils/findByKey";
import invariants from "../invariants";
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

  var deleteRecord = findByKey(current, key, deleteId);
  deleteRecord = prepareRecord(deleteRecord);

  return store.merge(current, deleteRecord, key);
}
