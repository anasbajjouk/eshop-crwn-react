import { useContext } from "react"
import CategoryPreview from "../../category-preview/category-preview.component"
import { CategoriesContext } from "../../contexts/categories.context"
import "./categories-preview.styles.scss"

const CategoriesPreview = () => {
  const { categoriesMap } = useContext(CategoriesContext)

  return (
    <div className="category-preview-container">
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title]
        return <CategoryPreview key={title} products={products} title={title} />
      })}
    </div>
  )
}

export default CategoriesPreview