import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { ShoppingCartContext } from '../../context';
import OrderCard from '../orderCard';
import { totalPrice } from '../../utils';

function CheckoutSideMenu() {
    const context = useContext(ShoppingCartContext);

    const closeCheckoutSideMenu = (action) => {
        if (action) action();
        context.closeCheckoutSideMenu();
        context.setSearchByTitle(null);
    }

    return (
        <aside 
            className={`${context.isCheckoutSideMenuOpen ? 'flex' : 'hidden'} flex-col fixed top-0 md:top-20 right-0 border rounded-xl bg-white z-40 w-full md:w-[360px] overflow-y-auto h-screen md:h-[calc(100vh-80px)] shadow-xl}`}
        >
            <div className='flex justify-between items-center p-5'>
                <h2 className='font-medium text-xl'>My Order</h2>
                <div>
                    <XMarkIcon 
                        className='h-6 w-6 text-black cursor-pointer' 
                        onClick={() => context.closeCheckoutSideMenu()}
                    />
                </div>
            </div>
            <div className='px-5 overflow-y-scroll flex-1'>
            {
                context.cartProducts.map((product) => (
                    <OrderCard 
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        imageUrl={product.image}
                        price={product.price} 
                        handleDelete={context.removeProductFromCart}
                    />
                ))
            }
            </div>
            <div className='px-5 mb-5'>
                <p className='flex justify-between items-center mb-3'>
                <span className='font-light'>Total:</span>
                <span className='font-medium text-2xl'>${totalPrice(context.cartProducts)}</span>
                </p>
                <Link to='/my-orders/last'>
                    <button className='bg-black py-3 text-white w-full rounded-lg' onClick={() => closeCheckoutSideMenu(() => context.handleCheckout())}>Checkout</button>
                </Link>
            </div>
        </aside>
    )
}

export default CheckoutSideMenu;