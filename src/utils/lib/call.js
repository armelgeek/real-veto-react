import { create, fetch, update, destroy } from ".";
import { values } from "lodash";
export function action(model) {
  return {
    get: (id) => fetch(model, { path: `${model}/${id}` }),
    create: (body, options) => create(model, body, options),
    update: (body, options) => update(model, body, options),
    destroy: (body, options) => destroy(model, body, options),
    fetch: (options, params) => fetch(model, options, params),
    createTransaction: (body, path) => create(model, body, { path: path }),
    updateTransaction: (body, path) => update(model, body, { path: path }),
  };
}
export function getData(model) {
  return {
    value: (state) => values(state[model].items),
    meta: (state) => state[model].meta,
  };
}
