import reduxCrud from "redux-crud";
import humps from "humps";
import { singular } from "pluralize";
import api from "../api";
import { isArray } from "lodash";

const wrapArray = (objectOrArray) =>
  isArray(objectOrArray) ? objectOrArray : [objectOrArray];

const transformKeys = (json = {}, key) => {
  const items = key ? json[key] || json[singular(key)] : json;
  return humps.camelizeKeys(items);
};
const fetchSuccessRequest = (
  action,
  nextId,
  totalItems,
  totalPages,
  currentPage,
  success
) => ({
  ...action,
  records: wrapArray(action.records),
  receivedAt: new Date(),
  nextId: nextId,
  success: success || "",
  totalItems: totalItems,
  totalPages: totalPages,
  currentPage: currentPage,
});

export const fetch =
  (resourceName, options = {}, params = {}) =>{
  return async function(dispatch,getState){
    const actionCreators = reduxCrud.actionCreatorsFor(resourceName);
    const path = options.path || humps.decamelize(resourceName);
    const reduxCrudOptions = options.replace
      ? { replace: options.replace }
      : undefined;
    const url =
      options.url || process.env.API_URL || "http://192.168.1.1:8100/api";
    dispatch(actionCreators.fetchStart());
    await api
      .get(`${url}/${path}`,false, params, options)
      .then((response) => {
        if (!response.hasOwnProperty("data")) {
          if (!response.hasOwnProperty("rows")) {
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
          } else {
            dispatch(
              fetchSuccessRequest(
                actionCreators.fetchSuccess(
                  transformKeys(response, "rows"),
                  reduxCrudOptions
                ),
                response.nextId,
                response.totalItems,
                response.totalPages,
                response.currentPage
              )
            );
          }
        } else {
          let data = response.data;
          dispatch(
            fetchSuccessRequest(
              actionCreators.fetchSuccess(
                transformKeys(data, "rows"),
                reduxCrudOptions
              ),
              data.nextId,
              data.totalItems,
              data.totalPages,
              data.currentPage
            )
          );
        }
      })
      .catch((err) => {
        console.error(`fetching ${resourceName} failed`);
        if (err.response) {
          dispatch(actionCreators.fetchError(err?.response.data.error));
        } else {
          dispatch(actionCreators.fetchError(err));
        }
      });
  }
};

// Create action

export const create =
  (resourceName, record, options = {
    hasFile:false
  }) =>
  async (dispatch) => {
    const actionCreators = reduxCrud.actionCreatorsFor(resourceName);
  
    const path = options.path || humps.decamelize(resourceName);
    const url =
      options.url || process.env.API_URL || "http://192.168.1.1:8100/api";
    dispatch(actionCreators.createStart(record));

    return await api
      .post(`${url}/${path}`,options.hasFile, record, options)
      .then((json) => {
        dispatch(
          actionCreators.createSuccess(json, json.id, {
            receivedAt: new Date(),
            success:
              options.success ||
              "Enregistrement du contenu  reussie avec succès.",
          })
        );
       if( options.resetForm) options.resetForm({});
      })
      .catch(function (error) {
        if (error) {
          dispatch(actionCreators.createError(error, record));
        } else if (error.message) {
          dispatch(actionCreators.createError(error, record));
        } else if (error?.response?.data?.message) {
          dispatch(
            actionCreators.createError(error?.response.data.message, record)
          );
        }
      });
  };

// Update action

export const update =
  (resourceName, body, options = {
    hasFile:false
  }) =>
  async (dispatch) => {
    const actionCreators = reduxCrud.actionCreatorsFor(resourceName);
    const path =
      options.path || [humps.decamelize(resourceName), body.id].join("/");
    const url =
      options.url || process.env.API_URL || "http://192.168.1.1:8100/api";
    dispatch(actionCreators.updateStart(body));

    return await api
      .put(`${url}/${path}`,options.hasFile, body, options)
      .then((json) => {
        dispatch(
          actionCreators.updateSuccess(
            transformKeys(json && { id: body.id }),
            body.id,
            {
              receivedAt: new Date(),
              success:
                options.success ||
                "Modification du contenu reussie acec succès.",
            }
          )
        );
      })
      .catch((error) => {
        if (error) {
          dispatch(actionCreators.updateError(error, body));
        } else if (error.message) {
          dispatch(actionCreators.updateError(error, body));
        } else if (error?.response?.data?.message) {
          dispatch(
            actionCreators.updateError(error?.response.data.message, body)
          );
        }
      });
  };

// Destroy action

export const destroy =
  (resourceName, body, options = {}) =>
  async (dispatch) => {
    const actionCreators = reduxCrud.actionCreatorsFor(resourceName);
    const path =
      options.path || [humps.decamelize(resourceName), body.id].join("/");
    const url =
      options.url || process.env.API_URL || "http://192.168.1.1:8100/api";
    dispatch(actionCreators.deleteStart(body));

    return await api
      .delete(`${url}${path}`,false, body, options)
      .then(() => {
        dispatch(
          actionCreators.deleteSuccess(body, {
            receivedAt: new Date(),
            success:
              options.success || "Suppression du contenu reussie avec succès.",
          })
        );
      })
      .catch((error) => {
        dispatch(actionCreators.deleteError(error, body));
        //  throw e;
      });
  };




// Exports

export const actionTypesFor = (resourceName) =>
  reduxCrud.actionTypesFor(resourceName);
export const actionCreatorsFor = (resourceName) =>
  reduxCrud.actionCreatorsFor(resourceName);
