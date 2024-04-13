import merge from "ramda/src/merge";
import * as invariant from "invariant";

import actionTypesFor from "./actionTypesFor";
import assertNotArray from "./utils/assertNotArray";
import constants from "./constants";
import getDefaultConfig from "./getDefaultConfig";


function actionCreatorsFor(resourceName, config) {
  if (resourceName == null)
    throw new Error("actionCreatorsFor: Expected resourceName");

  config = config || getDefaultConfig(resourceName);
  config = merge(config, {resourceName});

  const actionTypes = actionTypesFor(resourceName);
  const key = config.key || constants.DEFAULT_KEY;

  function assertError(actionCreatorName, error) {
    invariant(error != null, "Expected error in " + actionCreatorName);
  }

  function assertOneRecord(actionCreatorName, record) {
    invariant(record != null, "Expected record in " + actionCreatorName);
    assertNotArray(config, "createStart", record);
   
  }

  function assertManyRecords(actionCreatorName, records) {
    invariant(records != null, "Expected records " + actionCreatorName);
  }

  return {
    fetchStart(data) {
      return {
        data: data,
        type: actionTypes.fetchStart
      };
    },

    fetchSuccess(records, data) {
      var name = "fetchSuccess";
      assertManyRecords(name, records);

      return {
        data: data,
        records: records,
        type: actionTypes.fetchSuccess
      };
    },

    fetchError(error, data) {
      var name = "fetchError";
      assertError(name, error);

      return {
        data: data,
        error: error,
        type: actionTypes.fetchError
      };
    },

    createStart(record, data) {
      var name = "createStart";
      assertOneRecord(name, record);

      return {
        data: data,
        record: record,
        type: actionTypes.createStart
      };
    },

    createSuccess(record, clientGeneratedKey, data) {
      var name = "createSuccess";
      assertOneRecord(name, record);

      return {
        cid: clientGeneratedKey,
        data: data,
        record: record,
        type: actionTypes.createSuccess
      };
    },

    createError(error, record, data) {
      var name = "createError";
      assertError(name, error);
      assertOneRecord(name, record);

      return {
        data: data,
        error: error,
        record: record,
        type: actionTypes.createError
      };
    },

    updateStart(record, data) {
      var name = "updateStart";
      assertOneRecord(name, record);

      return {
        data: data,
        record: record,
        type: actionTypes.updateStart
      };
    },

    updateSuccess(record, data) {
      var name = "updateSuccess";
      assertOneRecord(name, record);

      return {
        data: data,
        record: record,
        type: actionTypes.updateSuccess
      };
    },

    updateError(error, record, data) {
      var name = "updateError";
      assertError(name, error);
      assertOneRecord(name, record);

      return {
        data: data,
        error: error,
        record: record,
        type: actionTypes.updateError
      };
    },

    deleteStart(record, data) {
      var name = "deleteStart";
      assertOneRecord(name, record);

      return {
        data: data,
        record: record,
        type: actionTypes.deleteStart
      };
    },

    deleteSuccess(record, data) {
      var name = "deleteSuccess";
      assertOneRecord(name, record);

      return {
        data: data,
        record: record,
        type: actionTypes.deleteSuccess
      };
    },

    deleteError(error, record, data) {
      var name = "deleteError";
      assertError(name, error);
      assertOneRecord(name, record);

      return {
        data: data,
        error: error,
        record: record,
        type: actionTypes.deleteError
      };
    }
  };
}

export default actionCreatorsFor;
