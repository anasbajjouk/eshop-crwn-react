import { configureStore } from "@reduxjs/toolkit"
import logger from "redux-logger"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import thunk from "redux-thunk"
import { rootReducer } from "./root-reducer"

if (process.env.NODE_ENV !== "production" && module.hot) {
  module.hot.accept("./root-reducer", () => store.replaceReducer(rootReducer))
}

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["user"],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const loggerMiddleware = process.env.NODE_ENV === "development" && logger

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [loggerMiddleware, thunk].filter(Boolean),
})

export const persistor = persistStore(store)
