import { createContext, useEffect, useState } from "react"
import {
  // addCollectionAndDocuments,
  getCategoriesAndDocuments,
} from "../utils/firebase/firebase.utils.js"

export const CategoriesContext = createContext({
  categoriesMap: {},
  setCategoriesMap: () => null,
})

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({})
  const value = { categoriesMap, setCategoriesMap }

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments("categories")
      setCategoriesMap(categoryMap)
    }

    getCategoriesMap()
  }, [])

  // useEffect(() => {
  //   addCollectionAndDocuments("categories", SHOP_DATA)
  // }, [])

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  )
}
