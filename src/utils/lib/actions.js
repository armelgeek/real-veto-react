import reduxCrud from '../crud';
import humps from 'humps';
import { singular } from 'pluralize';
import api from '../api';
import { isArray } from 'lodash';
const wrapArray = objectOrArray =>
  isArray(objectOrArray) ? objectOrArray : [objectOrArray];

const transformKeys = (json = {}, key) => {
  const items = key ? json[key] || json[singular(key)] : json;
  return humps.camelizeKeys(items);
};
const fetchSuccessRequest = (
  action,
  totalItems,
  totalPages,
  currentPage,
  success
) => ({
  ...action,
  records: wrapArray(action.records),
  receivedAt: new Date(),
  success: success || '',
  totalItems: totalItems,
  totalPages: totalPages,
  currentPage: currentPage,
});
const getSuccessRequest = action => ({
  ...action,
  records: action.records,
  receivedAt: new Date(),
});
export const get =
  (
    resourceName,
    resourceId,
    options = {},
    params = {},
    successCallback,
    errorCallback
  ) =>
  dispatch => {
    const actionCreators = reduxCrud.actionCreatorsFor(resourceName);
    const path = options.path || humps.decamelize(resourceName);
    const reduxCrudOptions = options.replace
      ? { replace: options.replace }
      : undefined;
    const url =
      options.url || process.env.API_URL || 'http://localhost:8100/api';
    dispatch(actionCreators.getStart());
    return api
      .get(`${url}/${path}/${resourceId}`, false, params, options)
      .then(response => {
        dispatch(
          getSuccessRequest(
            actionCreators.getSuccess(transformKeys(response), reduxCrudOptions)
          )
        );
        if (successCallback) {
          successCallback(transformKeys(response));
        }
      })
      .catch(err => {
        if (err.response) {
          if (errorCallback) {
            errorCallback(err.response);
          }
          dispatch(actionCreators.getError(err?.response.data.error));
        } else {
          if (errorCallback) {
            errorCallback(err);
          }
          dispatch(actionCreators.getError(err));
        }
      });
  };
  export const getNoParams =
  (
    resourceName,
    options = {},
    params = {},
    successCallback,
    errorCallback
  ) =>
  dispatch => {
    const actionCreators = reduxCrud.actionCreatorsFor(resourceName);
    const path = options.path || humps.decamelize(resourceName);
    const reduxCrudOptions = options.replace
      ? { replace: options.replace }
      : undefined;
    const url =
      options.url || process.env.API_URL || 'http://localhost:8100/api';
    dispatch(actionCreators.getStart());
    return api
      .get(`${url}/${path}`, false, params, options)
      .then(response => {
        dispatch(
          getSuccessRequest(
            actionCreators.getSuccess(transformKeys(response), reduxCrudOptions)
          )
        );
        if (successCallback) {
          successCallback(transformKeys(response));
        }
      })
      .catch(err => {
        if (err.response) {
          if (errorCallback) {
            errorCallback(err.response);
          }
          dispatch(actionCreators.getError(err?.response.data.error));
        } else {
          if (errorCallback) {
            errorCallback(err);
          }
          dispatch(actionCreators.getError(err));
        }
      });
  };

export const fetch =
  (resourceName, options = {}, params = {}, successCallback, errorCallback) =>
  dispatch => {
    const actionCreators = reduxCrud.actionCreatorsFor(resourceName);
    const path = options.path || humps.decamelize(resourceName);
    const reduxCrudOptions = options.replace
      ? { replace: options.replace }
      : undefined;
    const url =
      options.url || process.env.API_URL || 'http://localhost:8100/api';
    dispatch(actionCreators.fetchStart());
    return api
      .get(`${url}/${path}`, false, params, options)
      .then(response => {
        if (!response.hasOwnProperty('data')) {
          if (!response.hasOwnProperty('rows')) {
            dispatch(
              fetchSuccessRequest(
                actionCreators.fetchSuccess(
                  transformKeys(response),
                  reduxCrudOptions
                ),
                null,
                null,
                null
              )
            );
            if (successCallback) {
              successCallback(transformKeys(response));
            }
          } else {
            dispatch(
              fetchSuccessRequest(
                actionCreators.fetchSuccess(
                  transformKeys(response, 'rows'),
                  reduxCrudOptions
                ),
                response.totalItems,
                response.totalPages,
                response.currentPage
              )
            );
            if (successCallback) {
              successCallback(transformKeys(response, 'rows'));
            }
          }
        } else {
          let data = response.data;
          dispatch(
            fetchSuccessRequest(
              actionCreators.fetchSuccess(
                transformKeys(data, 'rows'),
                reduxCrudOptions
              ),
              data.totalItems,
              data.totalPages,
              data.currentPage
            )
          );
          if (successCallback) {
            successCallback(transformKeys(data, 'rows'));
          }
        }
      })
      .catch(err => {
        if (err.response) {
          if (errorCallback) {
            errorCallback(err.response);
          }
          dispatch(actionCreators.fetchError(err?.response.data.error));
        } else {
          if (errorCallback) {
            errorCallback(err);
          }
          dispatch(actionCreators.fetchError(err));
        }
      });
  };

// Create action

export const create =
  (
    resourceName,
    record,
    options = {
      hasFile: false,
    },
    successCallback,
    errorCallback
  ) =>
  dispatch => {
    const actionCreators = reduxCrud.actionCreatorsFor(resourceName);

    const path = options.path || humps.decamelize(resourceName);
    const url =
      options.url || process.env.API_URL || 'http://localhost:8100/api';
    dispatch(actionCreators.createStart(record));

    return api
      .post(`${url}/${path}`, options.hasFile, record, {
        replace: true,
      })
      .then(json => {
        dispatch(
          actionCreators.createSuccess(record, json.id, json)
        );
        if (successCallback) {
          successCallback(record);
        }
      })
      .catch(function (error) {
        if (error) {
          dispatch(actionCreators.createError(error, record));
          if (errorCallback) {
            errorCallback(error);
          }
        } else if (error.message) {
          dispatch(actionCreators.createError(error, record));
          if (errorCallback) {
            errorCallback(error.message);
          }
        } else if (error?.response?.data?.message) {
          if (errorCallback) {
            errorCallback(error?.response.data.message);
          }
          dispatch(
            actionCreators.createError(error?.response.data.message, record)
          );
        }
      });
  };

// Update action

export const update =
  (
    resourceName,
    body,
    options = {
      hasFile: false,
    },
    successCallback,
    errorCallback
  ) =>
  dispatch => {
    const actionCreators = reduxCrud.actionCreatorsFor(resourceName);
    const path =
      options.path || [humps.decamelize(resourceName), body.id].join('/');
    const url =
      options.url || process.env.API_URL || 'http://localhost:8100/api';
    dispatch(actionCreators.updateStart(body));

    return api
      .put(`${url}/${path}`, options.hasFile, body, options)
      .then(json => {
        dispatch(
          actionCreators.updateSuccess(body, body.id, {
            receivedAt: new Date(),
          })
        );
        if (successCallback) {
          successCallback(body);
        }
      })
      .catch(error => {
        if (error) {
          dispatch(actionCreators.updateError(error, body));
          if (errorCallback) {
            errorCallback(error);
          }
        } else if (error.message) {
          dispatch(actionCreators.updateError(error, body));
          if (errorCallback) {
            errorCallback(error.message);
          }
        } else if (error?.response?.data?.message) {
          dispatch(
            actionCreators.updateError(error?.response.data.message, body)
          );
          if (errorCallback) {
            errorCallback(error?.response.data.message);
          }
        }
      });
  };

// Destroy action

export const destroy =
  (resourceName, body, options = {}, successCallback, errorCallback) =>
  dispatch => {
    const actionCreators = reduxCrud.actionCreatorsFor(resourceName);
    const path =
      options.path || [humps.decamelize(resourceName), body.id].join('/');
    const url =
      options.url || process.env.API_URL || 'http://localhost:8100/api';
    dispatch(actionCreators.deleteStart(body));

    return api
      .delete(`${url}/${path}`, false, body, options)
      .then(() => {
        dispatch(
          actionCreators.deleteSuccess(body, { receivedAt: new Date() })
        );
        if (successCallback) {
          successCallback(body);
        }
      })
      .catch(error => {
        dispatch(actionCreators.deleteError(error, body));
        if (errorCallback) {
          errorCallback(error);
        }
      });
  };

// Exports

export const actionTypesFor = resourceName =>
  reduxCrud.actionTypesFor(resourceName);
export const actionCreatorsFor = resourceName =>
  reduxCrud.actionCreatorsFor(resourceName);
