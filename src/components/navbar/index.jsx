import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { ShoppingCartContext } from "../../context";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

function Navbar() {
    const activeStyle = 'underline underline-offset-4';
    const context = useContext(ShoppingCartContext)


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
                        onClick={() => context.setSearchByCategory('clothes')}
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
                        to='/furnitures'
                        onClick={() => context.setSearchByCategory('furnitures')}
                        className={({ isActive }) => 
                            isActive ? activeStyle : undefined
                    }>
                        Furnitures
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
                <li className="text-black/60">
                    email@email.com
                </li>
                <li>
                    <NavLink 
                        to='/my-orders'
                        className={({ isActive }) => 
                            isActive ? activeStyle : undefined
                    }>
                        My orders
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to='/my-account'
                        className={({ isActive }) => 
                            isActive ? activeStyle : undefined
                    }>
                        My account
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to='/sing-in'
                        className={({ isActive }) => 
                            isActive ? activeStyle : undefined
                    }>
                        Sign In
                    </NavLink>
                </li>
                <li className="flex">
                    <ShoppingCartIcon className="w-6 h-6 text-black" />
                    <div>{context.cartProducts.length}</div>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar