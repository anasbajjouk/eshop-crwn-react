import { createAction } from "../../utils/reducer/reducer.utils"
import { CART_ACTION_TYPES } from "./cart.types"

export const setIsCartOpen = (bool) =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool)

const addCartItem = (cartItems, productToAdd) => {
  //Find if cart items contain productToAdd
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  )

  //If found increment qunatity
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    )
  }

  //Return a new array with modified cartItems/ new cart item
  return [...cartItems, { ...productToAdd, quantity: 1 }]
}

const removeCartItem = (cartItems, cartItemToRemove) => {
  //Find cart item to remove
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  )

  //Check if qty === 1, if it is remove the item from the cart
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id)
  }

  //Return cart items with reducd qty
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  )
}

const clearCartItem = (cartItems, cartItemToClear) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id)
}

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd)
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove)
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

export const clearItemFromCart = (cartItems, cartItemToClear) => {
  const newCartItems = clearCartItem(cartItems, cartItemToClear)
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}
