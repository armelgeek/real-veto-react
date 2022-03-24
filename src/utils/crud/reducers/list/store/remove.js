import * as reject from "ramda/src/reject"
export default function remove(
  config,
  current,
  addedRecord,
) {
  var key = config.key;

  function predicate(record) {
    var recordKey = record[key];
    var isSameKey = addedRecord[key] === recordKey;
    return isSameKey;
  }

  return reject(predicate, current);
}
