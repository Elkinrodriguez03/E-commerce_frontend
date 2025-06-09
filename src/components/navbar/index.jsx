import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { ShoppingCartContext } from "../../context";
import {
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import { ShoppingBagIcon } from "@heroicons/react/20/solid";

function Navbar() {
  const activeStyle = "underline underline-offset-4";
  const context = useContext(ShoppingCartContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const signOut = localStorage.getItem("sign-out");
  const parsedSignOut = JSON.parse(signOut);
  const isUserSignOut = context.signOut || parsedSignOut;

  const handleSignOut = () => {
    const stringifiedSignOut = JSON.stringify(true);
    localStorage.setItem("sign-out", stringifiedSignOut);

    context.setSignOut(true);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const renderView = () => {
    if (isUserSignOut) {
      return (
        <li>
          <NavLink
            to="/sign-in"
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
            onClick={() => handleSignOut()}
          >
            Sign out
          </NavLink>
        </li>
      );
    } else {
      return (
        <>
          <li className="text-black/60">email@email.com</li>
          <li>
            <NavLink
              to="/my-orders"
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              My Orders
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-account"
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              My Account
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/sign-in"
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
              onClick={() => handleSignOut()}
            >
              Sign out
            </NavLink>
          </li>
        </>
      );
    }
  };

  return (
    <nav className="bg-gray-100 shadow-md flex justify-between items-center fixed z-10 top-0 w-full py-5 px-8 text-sm font-light">
      <ul className="flex items-center gap-3 ">
        <li>
          <ShoppingBagIcon className="w-8 h-8 text-black" />
        </li>
        <li className="font-semibold text-lg">
          <NavLink to="/">Shop</NavLink>
        </li>
      </ul>
      <div className="md:hidden">
        <button>
          {isMenuOpen ? (
            <XMarkIcon className="w-8 h-8 text-gray-700" onClick={toggleMenu} />
          ) : (
            <Bars3Icon className="w-8 h-8 text-black" onClick={toggleMenu} />
          )}
        </button>
      </div>

      {isMenuOpen && (
        <div
          className="fixed inset-0 z-20 md:hidden" // Full screen overlay
          onClick={toggleMenu} // Close menu when clicking outside
        ></div>
      )}
      <div
        className={`
          fixed top-0 right-0 h-full w-64 bg-gray-100 shadow-lg p-5
          transform transition-transform duration-300 ease-in-out
          ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
          md:relative md:flex md:h-auto md:w-auto md:p-0 md:shadow-none md:transform-none md:justify-end md:gap-3 md:flex-grow
        `}
      >
        <button
          onClick={toggleMenu}
          className="md:hidden absolute top-4 right-4 focus:outline-none text-black"
        >
          <XMarkIcon className="h-7 w-7" />
        </button>
        <h1 className="md:hidden text-2xl font-semibold mb-3 md:mb-0 md:text-lg mt-3 md:mt-0">
          Menu
        </h1>
        <ul className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-3 mt-10 md:mt-0 md:pr-3 md:border-r border-gray-500">
          <li>
            <NavLink
              to="/"
              onClick={() => context.setSearchByCategory()}
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              All
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/clothes"
              onClick={() =>
                context.setSearchByCategory(
                  `men's clothing`,
                  `women's clothing`
                )
              }
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              clothes
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/electronics"
              onClick={() => context.setSearchByCategory("electronics")}
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              electronics
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/jewelery"
              onClick={() => context.setSearchByCategory("jewelery")}
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Jewelery
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/others"
              onClick={() => context.setSearchByCategory("others")}
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              others
            </NavLink>
          </li>
        </ul>
        <ul className="flex flex-col md:flex-row items-start md:items-center z-10 gap-4 md:gap-3 mt-6 md:mt-0 pt-6 md:pt-0 border-t md:border-t-0 border-gray-300 md:border-trasnparent">
          {renderView()}
          <li className="flex items-center">
            <ShoppingCartIcon className="w-6 h-6 text-black" />
            <div>{context.cartProducts.length}</div>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
