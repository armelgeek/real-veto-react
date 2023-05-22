import { combineReducers } from "redux";
import reduxCrud from "redux-crud";

export const metaInitialState = {
  isFetching: false,
  didInvalidate: false,
  lastUpdatedAt: null,
  error: null,
  success: null,
  nextId: null,
};

export const metaFor = (resourceName, options = {}) => {
  const actionTypes = reduxCrud.actionTypesFor(resourceName);

  return (state = metaInitialState, action) => {
    switch (action.type) {
      case actionTypes.createStart:
        return {
          isLoading: true,
          error: null,
          success: "",
        };
      case actionTypes.createError:
        return {
          isLoading: false,
          error: action.error,
          success: action.success,
        };

      case actionTypes.createSuccess:
        return {
          ...action.payload,
          isLoading: false,
          error: null,
          success: action.success,
          lastUpdatedAt: action.receivedAt,
        };
      case actionTypes.createFailed:
        return {
          ...action.payload,
          isLoading: false,
          error: action.error,
          success: "",
        };
      case actionTypes.updateStart:
        return {
          ...state,
          isLoading: true,
          error: null,
          success: "",
        };
      case actionTypes.updateError:
        return {
          isLoading: false,
          error: action.error,
          success: "",
        };

      case actionTypes.updateSuccess:
        return {
          ...state,
          isLoading: false,
          error: null,
          success: action.success,
          lastUpdatedAt: action.receivedAt,
        };
      case actionTypes.updateFailed:
        return {
          ...state,
          isLoading: false,
          error: action.error,
          success: action.success,
        };

      case actionTypes.destroyStart:
        return {
          ...state,
          isLoading: true,
          error: null,
          success: "",
        };
      case actionTypes.destroySuccess:
        return {
          ...state,
          isLoading: false,
          error: null,
          success: action.success,
          lastUpdatedAt: action.receivedAt,
        };
      case actionTypes.deleteError:
        return {
          isLoading: false,
          error: action.error,
          success: "",
        };

      case actionTypes.destroyFailed:
        return {
          ...state,
          isLoading: false,
          error: action.error,
          success: "",
        };
      case actionTypes.fetchStart:
        return {
          ...state,
          didInvalidate: false,
          isFetching: true,
          records:[],
          error: null,
          success: "",
        };

      case actionTypes.fetchSuccess:
        return {
          ...state,
          didInvalidate: false,
          isFetching: false,
          success: action.success,
          nextId: action.nextId,
          totalPages: action.totalPages,
          totalItems: action.totalItems,
          currentPage: action.currentPage,
          lastUpdatedAt: action.receivedAt,
          error: null,
        };
      case 'CLEAR_DATA': return metaInitialState;
      case actionTypes.fetchError:
        return {
          ...state,
          isFetching: false,
          error: action.error,
        };
      default:
        return {
          ...state,
        };
    }
  };
};

export const itemsFor =
  (resourceName, options = {}) =>
  (state = {}, action) =>
    reduxCrud.Map.reducersFor(resourceName, options)(state, action);

export const reducersFor = (resourceName, options = {}) =>
  combineReducers({
    items: itemsFor(resourceName, options),
    meta: metaFor(resourceName, options),
  });

  
export const isFetching = (state) => state.meta.isFetching;
export const lastUpdatedAt = (state) => state.meta.lastUpdatedAt;
export const isFetchingInitial = (state) =>
  state.meta.isFetching && !state.meta.lastUpdatedAt;
