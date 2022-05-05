import { useContext } from "react"
import { CartContext } from "../../contexts/cart.context"
import { CartIconContainer, ItemCount, ShoppingIcon } from "./cart-icon.styles"

const CartIcon = () => {
  const { setIsCartOpen, cartCount } = useContext(CartContext)
  const toggleIsCartOpen = () => setIsCartOpen((prevState) => !prevState)

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  )
}

export default CartIcon
