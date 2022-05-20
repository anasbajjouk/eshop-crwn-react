import { Fragment } from "react"
import { useSelector } from "react-redux"
import { NavLink, Outlet } from "react-router-dom"
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg"
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component"
import CartIcon from "../../components/cart-icon/cart-icon.component"
import { selectIsCartOpen } from "../../store/cart/cart.selector"
import { selectCurrentUser } from "../../store/user/user.selector"
import { signOutUser } from "../../utils/firebase/firebase.utils"
import {
  LogoContainer,
  NavigationContainer,
  NavLinksContainer,
} from "./navigation.styles"

const Navigation = () => {
  const isCartOpen = useSelector(selectIsCartOpen)
  const currentUser = useSelector(selectCurrentUser)

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo />
        </LogoContainer>

        <NavLinksContainer>
          <NavLink to="/shop">SHOP</NavLink>
          {currentUser ? (
            <NavLink to="#" onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinksContainer>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  )
}

export default Navigation
