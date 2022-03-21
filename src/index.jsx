import React from "react";
/** @jsxImportSource @welldone-software/why-did-you-render */
if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    trackAllPureComponents: true,
    titleColor: "green",
    diffNameColor: "darkturquoise"
  });
}
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Routes from "./Routes";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/montserrat/600.css";
import "./@adminlte/adminlte/css/adminlte.css";
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import theme from "./theme";

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes />
      </PersistGate>
    </Provider>
  </ChakraProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
