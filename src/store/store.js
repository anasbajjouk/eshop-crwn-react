import { configureStore } from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage"
// import thunk from "redux-thunk"
import logger from "redux-logger"
import createSagaMiddleware from "redux-saga"
import { persistStore, persistReducer } from "redux-persist"
import { rootReducer } from "./root-reducer"
import { rootSaga } from "./root-saga"

if (process.env.NODE_ENV !== "production" && module.hot) {
  module.hot.accept("./root-reducer", () => store.replaceReducer(rootReducer))
}

const sagaMiddleware = createSagaMiddleware()

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [
    process.env.NODE_ENV === "development" && logger,
    sagaMiddleware,
    // thunk,
  ].filter(Boolean),
})

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)
