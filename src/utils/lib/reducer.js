import { combineReducers } from 'redux';
import crud from '../crud';

export const metaInitialState = {
  isFetching: false,
  lastUpdatedAt: null,
  error: null,
  success: null,
};

export const metaFor = (resourceName, options = {}) => {
  const actionTypes = crud.actionTypesFor(resourceName);

  return (state = metaInitialState, action) => {
    switch (action.type) {
      case actionTypes.createStart:
        return {
          isLoading: true,
          error: null,
          success: '',
          data: action.data
        };
      case actionTypes.createError:
        return {
          isLoading: false,
          error: action.error,
          success: action.success,
          data: action.data
        };

      case actionTypes.createSuccess:
        return {
          ...action.payload,
          isLoading: false,
          error: null,
          success: action.success,
          lastUpdatedAt: action.receivedAt,
          data: action.data
        };
      case actionTypes.createFailed:
        return {
          ...action.payload,
          isLoading: false,
          error: action.error,
          success: '',
          data: action.data
        };
      case actionTypes.updateStart:
        return {
          ...state,
          isLoading: true,
          error: null,
          success: '',
          data: action.data
        };
      case actionTypes.updateError:
        return {
          isLoading: false,
          error: action.error,
          success: '',
          data: action.data
        };

      case actionTypes.updateSuccess:
        return {
          ...state,
          isLoading: false,
          error: null,
          success: action.success,
          lastUpdatedAt: action.receivedAt,
          data: action.data
        };
      case actionTypes.updateFailed:
        return {
          ...state,
          isLoading: false,
          error: action.error,
          success: action.success,
          data: action.data
        };

      case actionTypes.destroyStart:
        return {
          ...state,
          isLoading: true,
          error: null,
          success: '',
          data: action.data
        };
      case actionTypes.destroySuccess:
        return {
          ...state,
          isLoading: false,
          error: null,
          success: action.success,
          lastUpdatedAt: action.receivedAt,
          data: action.data
        };
      case actionTypes.deleteError:
        return {
          isLoading: false,
          error: action.error,
          success: '',
          data: action.data
        };

      case actionTypes.destroyFailed:
        return {
          ...state,
          isLoading: false,
          error: action.error,
          success: '',
          data: action.data
        };
      case actionTypes.getStart:
        return {
          ...state,
          isLoading: true,
          didInvalidate: false,
          isFetching: true,
          error: null,
          success: '',
          data: action.data
        };
      case actionTypes.getSuccess:
        return {
          ...state,
          isFetching: false,
        };
      case actionTypes.getError:
        return {
          ...state,
          isFetching: false,
          error: action.error,
        };

      case actionTypes.fetchStart:
        return {
          ...state,
          isFetching: true,
          error: null,
          success: '',
          data: action.data
        };

      case actionTypes.fetchSuccess:
        return {
          ...state,
          isFetching: false,
          success: action.success,
          totalPages: action.totalPages,
          totalItems: action.totalItems,
          currentPage: action.currentPage,
          lastUpdatedAt: action.receivedAt,
          error: null,
          data: action.data
        };
      case actionTypes.fetchError:
        return {
          ...state,
          isFetching: false,
          isLoading: false,
          error: action.error,
          data: action.data
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
    crud.Map.reducersFor(resourceName, options)(state, action);

export const reducersFor = (resourceName, options = {}) =>
  combineReducers({
    items: itemsFor(resourceName, options),
    meta: metaFor(resourceName, options),
  });
