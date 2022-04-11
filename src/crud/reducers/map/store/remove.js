import * as omit from "ramda/src/omit"

export default function remove(
  config,
  current,
  record
) {
  var key = config.key;
  var recordKey = record[key];

  return omit([recordKey], current);
}
