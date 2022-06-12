import { FC } from "react"
import { CartItemContainer, CartItemImage, ItemDetails, ItemName } from "./cart-item.styles"
import { CartItem as TCartItem } from "../../store/cart/cart.types"

type CartItemProps = {
  cartItem: TCartItem
}

const CartItem: FC<CartItemProps> = ({ cartItem }) => {
  const { name, quantity, imageUrl, price } = cartItem
  return (
    <CartItemContainer>
      <CartItemImage src={imageUrl} alt={`${name}`} />
      <ItemDetails>
        <ItemName>{name}</ItemName>
        <span className="price">
          {quantity} x ${price}
        </span>
      </ItemDetails>
    </CartItemContainer>
  )
}

export default CartItem
