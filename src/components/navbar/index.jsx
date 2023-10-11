import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { ShoppingCartContext } from "../../context";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

function Navbar() {
    const activeStyle = 'underline underline-offset-4';
    const context = useContext(ShoppingCartContext)

    const signOut = localStorage.getItem('sign-out')
    const parsedSignOut = JSON.parse(signOut)
    const isUserSignOut = context.signOut || parsedSignOut

    const handleSignOut = () => {
        const stringifiedSignOut = JSON.stringify(true);
        localStorage.setItem('sign-out', stringifiedSignOut);

        context.setSignOut(true);
    }

    const renderView = () => {
        if (isUserSignOut) {
          return (
            <li>
              <NavLink
                to="/sign-in"
                className={({ isActive }) => isActive ? activeStyle : undefined }
                onClick={() => handleSignOut()}
            >
                Sign out
              </NavLink>
            </li>
          )
        } else {
          return (
            <>
              <li className='text-black/60'>
                email@email.com
              </li>
              <li>
                <NavLink
                  to='/my-orders'
                  className={({ isActive }) => isActive ? activeStyle : undefined}>
                  My Orders
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/my-account'
                  className={({ isActive }) => isActive ? activeStyle : undefined}>
                  My Account
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/sign-in'
                  className={({ isActive }) => isActive ? activeStyle : undefined}
                  onClick={() => handleSignOut()}>
                  Sign out
                </NavLink>
              </li>
            </>
          )
        }
      }

    return (
        <nav className="flex justify-between items-center fixed z-10 top-0 w-full py-5 px-8 text-sm font-light">
            <ul className="flex items-center gap-3">
                <li className="font-semibold text-lg">
                    <NavLink to='/'>
                        Shop
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to='/'
                        onClick={() => context.setSearchByCategory()}
                        className={({ isActive }) => 
                            isActive ? activeStyle : undefined
                    }>
                        All
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to='/clothes'
                        onClick={() => context.setSearchByCategory(`men's clothing`, `women's clothing`)}
                        className={({ isActive }) => 
                            isActive ? activeStyle : undefined
                    }>
                        clothes
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to='/electronics'
                        onClick={() => context.setSearchByCategory('electronics')}
                        className={({ isActive }) => 
                            isActive ? activeStyle : undefined
                    }>
                        electronics
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to='/jewelery'
                        onClick={() => context.setSearchByCategory('jewelery')}
                        className={({ isActive }) => 
                            isActive ? activeStyle : undefined
                    }>
                        Jewelery
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to='/others'
                        onClick={() => context.setSearchByCategory('others')}
                        className={({ isActive }) => 
                            isActive ? activeStyle : undefined
                    }>
                        others 
                    </NavLink>
                </li>
            </ul>
            <ul className="flex items-center z-10 gap-3">
                {renderView()}
                <li className="flex items-center">
                    <ShoppingCartIcon className="w-6 h-6 text-black" />
                    <div>{context.cartProducts.length}</div>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;