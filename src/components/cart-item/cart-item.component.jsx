import "./cart-item.styles.scss"

const CartItem = ({ CartItem }) => {
  const { name, quantity } = CartItem
  return (
    <div className="">
      <h2>{name}</h2>
      <span>{quantity}</span>
    </div>
  )
}

export default CartItem
