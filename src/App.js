import { lazy, Suspense, useEffect } from "react"
import { useDispatch } from "react-redux"
import { Route, Routes } from "react-router-dom"

import Spinner from "./components/spinner/spinner.component"

import { checkUserSession } from "./store/user/user.action"

// Dynamic Imports
const Home = lazy(() => import("./routes/home/home.component"))
const Authentication = lazy(() => import("./routes/authentication/authentication.component"))
const Navigation = lazy(() => import("./routes/navigation/navigation.component"))
const Checkout = lazy(() => import("./components/checkout/checkout.component"))
const Shop = lazy(() => import("./routes/shop/shop.component"))

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkUserSession())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="shop/*" element={<Shop />} />
          <Route path="auth" element={<Authentication />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
