import React from "react";
/** @jsxImportSource @welldone-software/why-did-you-render */
/**if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    trackAllPureComponents: true,
    titleColor: "green",
    diffNameColor: "darkturquoise"
  });
}**/
import './index.css';
import ReactDOM from "react-dom";
import { AuthProvider } from 'react-auth-kit'
import reportWebVitals from "./reportWebVitals";
import Routes from "./Routes";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { persistor, store } from "./store";
import Ping from "./components/Ping";
import { PersistGate } from "redux-persist/integration/react";
import { ChakraProvider } from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@fontsource/montserrat/400.css";
import "./@adminlte/adminlte/css/adminlte.css";
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import 'react-month-picker-input/dist/react-month-picker-input.css'
import VersionModal from './components/version/VersionModal';
import theme from "./theme";
ReactDOM.render(
  <ChakraProvider theme={theme}>
    <Provider store={store}>
    <VersionModal/>
    <ToastContainer
              position="top-right"
              autoClose={5000}
              limit={2}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
      <PersistGate loading={null} persistor={persistor}>
      <AuthProvider authType = {'localstorage'}
                  authName={'_auth_veto'}
      >
          <Routes />
        </AuthProvider>
        {/**<Ping />**/}
      </PersistGate>
    </Provider>
  </ChakraProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
