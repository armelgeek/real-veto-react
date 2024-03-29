import { create, get,getNoParams,setItems, set , fetch, update, destroy } from ".";
import { values } from "lodash";
//importer { createSelector } à partir de 'reselect' ;
//https://itnext.io/3-small-tips-for-better-redux-performance-in-a-react-app-9cde549df6af
export function action(model, api) {
  return {
    get: (id) => get(model, id, { replace: true }),
    getWithPath: (id, path) => get(model, id, { path: path, replace: true }),
    getNoParams: (path) => getNoParams(model, { path: path, replace: true }),
    create: (body, options) => create(model, body, options),
    update: (body, options) => update(model, body, options),
    destroy: (body, options) => destroy(model, body, options),
    fetch: (options, params) => fetch(model, options, params),
    setItems: (data) => setItems(model, data),
    createTransaction: (body, path) => create(model, body, { path: path }),
    updateData: (body, path) => set(model, body, { path: path }),
    updateTransaction: (body, path) => update(model, body, { path: path }),
    deleteTransaction: (body, path) => destroy(model, body, { path: path }),
  };
}
export function getData(model) {
  return {
    value: (state) => (state[model].items ? values(state[model].items) : []),
    item: (state) => (state[model].items ? state[model].items : []),
    meta: (state) => state[model].meta,
  };
}
