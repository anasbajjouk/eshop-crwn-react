import { CartState } from "./cart.reducer"
import { createSelector } from "reselect"

const selectCartReducer = (state): CartState => state.cart

export const selectCartItem = createSelector([selectCartReducer], (cart) => cart.cartItems)

export const selectIsCartOpen = createSelector([selectCartReducer], (cart) => cart.isCartOpen)

export const selectCartCount = createSelector([selectCartItem], (cartItems) =>
  cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
)

export const selectCartTotal = createSelector([selectCartItem], (cartItems) =>
  cartItems.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0)
)
