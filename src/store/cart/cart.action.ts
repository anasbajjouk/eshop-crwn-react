import { CategoryItem } from "./../categories/category.types"
import { ActionWithPayload, createAction, withMatcher } from "../../utils/reducer/reducer.utils"
import { CartItem } from "./cart.types"
import { CART_ACTION_TYPES } from "./cart.types"

export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>
export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>

export const setCartItems = withMatcher(
  (cartItems: CartItem[]): SetCartItems => createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
)

export const setIsCartOpen = withMatcher(
  (bool: boolean): SetIsCartOpen => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool)
)

const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem): CartItem[] => {
  //Find if cart items contain productToAdd
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id)

  //If found increment qunatity
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
    )
  }

  //Return a new array with modified cartItems/ new cart item
  return [...cartItems, { ...productToAdd, quantity: 1 }]
}

const removeCartItem = (cartItems: CartItem[], cartItemToRemove: CartItem): CartItem[] => {
  //Find cart item to remove
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id)

  //Check if qty === 1, if it is remove the item from the cart
  if (existingCartItem && existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id)
  }

  //Return cart items with reducd qty
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  )
}

const clearCartItem = (cartItems: CartItem[], cartItemToClear: CartItem): CartItem[] => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id)
}

export const addItemToCart = (cartItems: CartItem[], productToAdd: CategoryItem) => {
  const newCartItems = addCartItem(cartItems, productToAdd)
  return setCartItems(newCartItems)
}

export const removeItemFromCart = (cartItems: CartItem[], cartItemToRemove: CartItem) => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove)
  return setCartItems(newCartItems)
}

export const clearItemFromCart = (cartItems: CartItem[], cartItemToClear: CartItem) => {
  const newCartItems = clearCartItem(cartItems, cartItemToClear)
  return setCartItems(newCartItems)
}
