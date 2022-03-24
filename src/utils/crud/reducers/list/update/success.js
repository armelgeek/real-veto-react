import constants from "../../../constants";
import invariants from "../invariants";
import store from "../store";

var reducerName = constants.REDUCER_NAMES.UPDATE_SUCCESS;
var invariantArgs = {
  reducerName,
  canBeArray: false
};

export default function success(
  config,
  current,
  record
) {
  invariants(invariantArgs, config, current, record);

  return store.merge(current, record, config.key);
}
