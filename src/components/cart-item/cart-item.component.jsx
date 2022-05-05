import {
  CartItemContainer,
  CartItemImage,
  ItemDetails,
  ItemName,
} from "./cart-item.styles.js"

const CartItem = ({ cartItem }) => {
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
