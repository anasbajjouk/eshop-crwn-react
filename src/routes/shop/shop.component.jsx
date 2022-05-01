import { useContext } from "react"
import { ProductsContext } from "../../contexts/products.context"

const Shop = () => {
  const { products } = useContext(ProductsContext)

  return (
    <div className="">
      {products.map(({ name, id }) => (
        <div key={id}>
          <h1>{name}</h1>
        </div>
      ))}
    </div>
  )
}

export default Shop
