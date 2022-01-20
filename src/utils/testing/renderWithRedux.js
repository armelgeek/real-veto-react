import React from 'react';
import { createStore } from "redux";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
const renderWithRedux = (
  component,
  
  { initialState,reducer, store = createStore(reducer, initialState) } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};
export default renderWithRedux;
