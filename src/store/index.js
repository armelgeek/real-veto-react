import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from "redux-thunk";
import routeReducer from './reducers/index';
import { undoMiddeware } from "react-redux-undo";

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};
const { persistStore, persistReducer } = require("redux-persist");
const storage = require("redux-persist/lib/storage").default;
const persistConfig = {
  key: "root",
  whitelist: ['auth','profile', 'basket', 'approvisionnement'],
  storage,
};
const persistedReducer = persistReducer(persistConfig, routeReducer)
let store = createStore(persistedReducer, bindMiddleware([thunkMiddleware]))
let persistor = persistStore(store)
export { store, persistor };