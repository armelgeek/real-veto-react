import constants from "../../../constants";
import store from "../store";
import wrapArray from "../../../utils/wrapArray";
import invariants from "../invariants";

const reducerName = constants.REDUCER_NAMES.GET_SUCCESS;
const invariantArgs = {
  reducerName,
  canBeArray: true
};

export default function success(
  config,
  current,
  records,
  emptyState,
  replace = false
){
  invariants(invariantArgs, config, current, records);

  // wrap array
  records = wrapArray(records);


  return records;
}
