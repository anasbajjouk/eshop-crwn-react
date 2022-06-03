import { configureStore, Middleware } from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage"
import logger from "redux-logger"
import createSagaMiddleware from "redux-saga"
import { persistStore, persistReducer, PersistConfig } from "redux-persist"
import { rootReducer } from "./root-reducer"
import { rootSaga } from "./root-saga"

export type RootState = ReturnType<typeof rootReducer>

const sagaMiddleware = createSagaMiddleware()

type ExtendedPersistConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[]
}

const persistConfig: ExtendedPersistConfig = {
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
  ].filter((middleware): middleware is Middleware => Boolean(middleware)),
})

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)
