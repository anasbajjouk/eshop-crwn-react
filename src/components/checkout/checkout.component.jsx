import { useSelector } from "react-redux"
import { selectCartItem, selectCartTotal } from "../../store/cart/cart.selector"
import CheckoutItem from "../checkout-item/checkout-item.component"
import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total,
} from "./checkout.styles"

const headerBlockData = [
  "Product",
  "Description",
  "Quantity",
  "Price",
  "Remove",
]
const Checkout = () => {
  const cartItems = useSelector(selectCartItem)
  const cartTotal = useSelector(selectCartTotal)

  return (
    <CheckoutContainer>
      <CheckoutHeader>
        {headerBlockData.map((data, idx) => {
          return (
            <HeaderBlock key={idx}>
              <span>{data}</span>
            </HeaderBlock>
          )
        })}
      </CheckoutHeader>

      {cartItems.map((cartItem) => (
        <CheckoutItem cartItem={cartItem} key={cartItem.id} />
      ))}
      <Total>Total: ${cartTotal}</Total>
    </CheckoutContainer>
  )
}

export default Checkout
