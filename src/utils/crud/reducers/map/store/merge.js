import * as merge from "ramda/src/merge"

/*
Adds or replace one record
*/
export default function replace(
  config,
  current,
  record
) {
  var key = config.key;
  var recordKey = record[key];

  return merge(current, {[recordKey]: record});
}
