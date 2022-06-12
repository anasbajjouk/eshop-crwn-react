import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { selectCartItem } from "../../store/cart/cart.selector"
import Button from "../button/button.component"
import CartItem from "../cart-item/cart-item.component"
import {
  CartDropdownContainer,
  CartItems,
  EmptyMessage,
} from "./cart-dropdown.styles"

const CartDropdown = () => {
  const navigate = useNavigate()
  const cartItems = useSelector(selectCartItem)

  const goToCheckoutHandler = () => {
    navigate("/checkout")
  }

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage>Your cart is empty!</EmptyMessage>
        )}
        <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
      </CartItems>
    </CartDropdownContainer>
  )
}

export default CartDropdown
