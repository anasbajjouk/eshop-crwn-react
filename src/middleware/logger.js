//currying
export const LoggerMiddlware = (store) => (next) => (action) => {
  if (!action.type) {
    return next()
  }

  console.log("Type: ", action.type)
  console.log("Payload: ", action.payload)
  console.log("CurrentState: ", store.getState())

  next(action)

  console.log("Next State: ", store.getState())
}
