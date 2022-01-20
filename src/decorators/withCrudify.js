import axios from "axios";
import { values } from "lodash";
import React,{useState} from "react";

import {
  create,
  fetch,
  update,
  destroy
} from '../utils/lib/index';

const withCrudify=(Component) =>(props)=>{
  const action=(model)=> {
    return {
      get: (id) => fetch(model, { path: `${model}/${id}` }),
      create: (body) => create(model, body),
      update: (body) => update(model, body),
      destroy: (body) => destroy(model, body),
      fetch: (options, params) => fetch(model, options, params)
    }
  }
  const getData=(model)=> {
    return {
      value: (state) => values(state[model].items),
      meta: (state) => state[model].meta
    }
  }
  const redux = () => {
    return {
      action: action,
      getData: getData
    }
  }
  return <Component {...props} redux={redux} />;
 
  };
export default withCrudify;