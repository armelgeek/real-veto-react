import * as indexBy from "ramda/src/indexBy"
import * as prop from "ramda/src/prop"
import * as merge from "ramda/src/merge"

import assertAllHaveKeys from "../../../utils/assertAllHaveKeys";
import constants from "../../../constants";
import invariants from "../invariants";
import wrapArray from "../../../utils/wrapArray";
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
