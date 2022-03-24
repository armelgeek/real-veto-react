import { combineReducers } from 'redux';
import crud from '../crud';

export const metaInitialState = {
  isFetching: false,
  didInvalidate: false,
  lastUpdatedAt: null,
  error: null,
  success: null,
  nextId: null,
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
          success: '',
        };
      case actionTypes.updateStart:
        return {
          ...state,
          isLoading: true,
          error: null,
          success: '',
        };
      case actionTypes.updateError:
        return {
          isLoading: false,
          error: action.error,
          success: '',
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
          success: '',
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
          success: '',
        };

      case actionTypes.destroyFailed:
        return {
          ...state,
          isLoading: false,
          error: action.error,
          success: '',
        };
      case actionTypes.fetchStart:
        return {
          ...state,
          isLoading: true,
          didInvalidate: false,
          isFetching: true,
          error: null,
          success: '',
        };

      case actionTypes.fetchSuccess:
        return {
          ...state,
          didInvalidate: false,
          isFetching: false,
          isLoading: false,
          success: action.success,
          nextId: action.nextId,
          totalPages: action.totalPages,
          totalItems: action.totalItems,
          currentPage: action.currentPage,
          lastUpdatedAt: action.receivedAt,
          error: null,
        };
      case actionTypes.fetchError:
        return {
          ...state,
          isFetching: false,
          isLoading: false,
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
    crud.Map.reducersFor(resourceName, options)(state, action);

export const reducersFor = (resourceName, options = {}) =>
  combineReducers({
    items: itemsFor(resourceName, options),
    meta: metaFor(resourceName, options),
  });
export const isFetching = state => state.meta.isFetching;
