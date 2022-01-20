
import { create, fetch,update,destroy } from '.';
import { values } from 'lodash';
export function action(model){
    return {
        get : (id) => fetch(model, { path: `${model}/${id}`,replace:true }),
        create: (body,options) => create(model,body,options ),
        update : (body,options) => update(model,body, options ),
        destroy: (body,options) => destroy(model,body, options ),
        fetch: (options,params) => fetch(model,options,params)
    }
}
export function getData(model){
    return {
        value : (state) => values(state[model].items),
        meta : (state) => state[model].meta
    }
}