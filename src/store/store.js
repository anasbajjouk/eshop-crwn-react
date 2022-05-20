import { configureStore } from "@reduxjs/toolkit"
import logger from "redux-logger"
import thunk from "redux-thunk"
import { rootReducer } from "./root-reducer"

if (process.env.NODE_ENV !== "production" && module.hot) {
  module.hot.accept("./root-reducer", () => store.replaceReducer(rootReducer))
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: [process.env.NODE_ENV === "development" && logger, thunk],
})

//currying
// const LoggerMiddlware = (store) => (next) => (action) => {
//   if (!action.type) {
//     return next()
//   }

//   console.log("Type: ", action.type)
//   console.log("Payload: ", action.payload)
//   console.log("CurrentState: ", store.getState())

//   next(action)

//   console.log("Next State: ", store.getState())
// }
