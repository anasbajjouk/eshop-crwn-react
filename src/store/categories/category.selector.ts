import { CategoryMap } from "./category.types"
import { CategoriesState } from "./category.reducer"
import { createSelector } from "reselect"

const selectCategoryReducer = (state): CategoriesState => state.categories

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
)

export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
)

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories): CategoryMap =>
    categories.reduce((acc, category) => {
      const { title, items } = category
      acc[title.toLowerCase()] = items
      return acc
    }, {} as CategoryMap)
)
