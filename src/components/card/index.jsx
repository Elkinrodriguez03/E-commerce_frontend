import { useContext } from "react";
import { ShoppingCartContext } from "../../context";
import { CheckIcon, PlusIcon } from "@heroicons/react/24/outline";

function Card(data) {
    const context = useContext(ShoppingCartContext);

    const showProduct = (productDetail) => {
        context.openProductDetail()
        context.setProductToShow(productDetail)
    }

    const addProductsToCart = (event, productData) => {
        event.stopPropagation()
        context.setCartProducts([...context.cartProducts, productData])
        context.setCounter(context.counter + 1)
        context.openCheckoutSideMenu()
        context.closeProductDetail()
    }

    const renderIcon = (id) => {
        const isInCart = context.cartProducts.filter(product => product.id === id).length > 0;

        if (isInCart) {
            return (
                <button 
                    className="absolute top-0 right-0 flex justify-center items-center bg-green-500 w-6 h-6 rounded-full m-3 p-1"
                >
                    <CheckIcon className="w-6 h-6 text-white" />
                </button>
            )
        } else {
            return (
                <button 
                    className="absolute top-0 right-0 flex justify-center items-center bg-gray-100 w-6 h-6 rounded-full m-3 p-1"
                    onClick={(event) => addProductsToCart(event, data.data)}
                >
                    <PlusIcon className="w-6 h-6 text-black" />
                </button>
            )
        }
    }

    return (
        <div 
            className="bg-white cursor-pointer w-full max-w-sm rounded-lg m-10 shadow-lg"
            onClick={() => showProduct(data.data)}
        >
            <figure className="relative mb-3 w-full h-80 sm:h-80 md:h-64 lg:h-72 overflow-hidden rounded-t-lg p-5">
                <span className="absolute bottom-0 left-0 bg-gray-200 rounded-lg text-black text-xs m-3 px-3 py-0.5 z-10">{data.data.category}</span>
                <img className="w-full h-full object-scale-down rounded-lg" src={data.data.image} alt={data.data.title} />
                {renderIcon(data.data.id)}
            </figure>
            <p className="flex justify-between px-5 pb-5">
                <span className="text-xs font-light">{data.data.title}</span>
                <span className="text-lg font-medium">${data.data.price}</span>
            </p>
        </div>
    )
}

export default Card