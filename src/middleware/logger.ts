import { Middleware } from "@reduxjs/toolkit"
import { RootState } from "./../store/store"

//currying
export const LoggerMiddlware: Middleware<{}, RootState> = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action)
  }

  console.log("Type: ", action.type)
  console.log("Payload: ", action.payload)
  console.log("CurrentState: ", store.getState())

  next(action)

  console.log("Next State: ", store.getState())
}
