import {prepareRecord} from "../../common/create/start";
import constants from "../../../constants";
import invariants from "../invariants";
import store from "../store";

var reducerName = constants.REDUCER_NAMES.CREATE_START;
var invariantArgs = {
  reducerName,
  canBeArray: false
};

export default function start(
  config,
  current,
  record,
) {
  invariants(invariantArgs, config, current, record);

  // mark record as unsaved and busy
  var newRecord = prepareRecord(record);

  return current;
}
