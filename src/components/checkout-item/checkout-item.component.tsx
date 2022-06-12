import { FC } from "react"
import { useSelector, useDispatch } from "react-redux"
import { addItemToCart, removeItemFromCart, clearItemFromCart } from "../../store/cart/cart.action"
import { selectCartItem } from "../../store/cart/cart.selector"
import { CartItem } from "../../store/cart/cart.types"
import {
  Arrow,
  BaseSpan,
  CheckoutItemContainer,
  ImageContainer,
  Quantity,
  RemoveButton,
  Value,
} from "./checkout-item.styles.js"

type CheckoutItemProps = {
  cartItem: CartItem
}

const CheckoutItem: FC<CheckoutItemProps> = ({ cartItem }) => {
  const { name, imageUrl, quantity, price } = cartItem

  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItem)

  const clearItemHandler = () => dispatch(clearItemFromCart(cartItems, cartItem))
  const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem))
  const removeItemHandler = () => dispatch(removeItemFromCart(cartItems, cartItem))

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <BaseSpan>{name}</BaseSpan>
      <Quantity>
        <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={addItemHandler}>&#10095;</Arrow>
      </Quantity>
      <span className="price">{price}</span>

      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  )
}

export default CheckoutItem
