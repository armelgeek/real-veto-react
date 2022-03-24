import constants from "../../../constants";
import invariants from "../invariants";


var reducerName = constants.REDUCER_NAMES.CREATE_SUCCESS;
var invariantArgs = {
  reducerName,
  canBeArray: false
};

export default function success(
  config,
  current,
  addedRecord,
  clientGeneratedKey
) {
  invariants(invariantArgs, config, current, addedRecord);

  var key = config.key;
  var done = false;

  // Update existing records
  var updatedCollection = current.map(function(record) {
    var recordKey = record[key];
    if (recordKey == null) throw new Error("Expected record to have " + key);
    var isSameKey = recordKey === addedRecord[key];
    var isSameClientGetKey =
      clientGeneratedKey != null && clientGeneratedKey === recordKey;
    if (isSameKey || isSameClientGetKey) {
      done = true;
      return addedRecord;
    } else {
      return record;
    }
  });

  // Add if not updated
  if (!done) {
    updatedCollection = updatedCollection.concat([addedRecord]);
  }

  return updatedCollection;
}
