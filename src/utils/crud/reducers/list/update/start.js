import {prepareRecord} from "../../common/update/start";
import constants from "../../../constants";
import invariants from "../invariants";
import store from "../store";

var reducerName = constants.REDUCER_NAMES.UPDATE_START;
var invariantArgs = {
  reducerName,
  canBeArray: false
};

export default function start(
  config,
  current,
  record
){
  invariants(invariantArgs, config, current, record);

  // mark record as unsaved and busy
  var newRecord = [prepareRecord(record)];

  // replace record
  return store.merge(current, newRecord, config.key);
}
