import * as dissoc from "ramda/src/dissoc"
import constants from "../../../constants";

export function prepareRecord(record) {
  return dissoc(constants.SPECIAL_KEYS.BUSY, record);
}
