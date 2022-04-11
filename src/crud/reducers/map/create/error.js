import constants from "../../../constants";
import invariants from "../invariants";
import store from "../store";

var reducerName = constants.REDUCER_NAMES.CREATE_ERROR;
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
  return store.remove(config, current, record);
}
