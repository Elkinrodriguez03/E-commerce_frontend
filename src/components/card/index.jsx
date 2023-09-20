import { useContext } from "react";
import { ShoppingCartContext } from "../../context";
import { PlusIcon } from "@heroicons/react/24/outline";

function Card(data) {
    const context = useContext(ShoppingCartContext);

    const showProduct = (productDetail) => {
        context.openProductDetail()
        context.setProductToShow(productDetail)
    }

    return (
        <div 
            className="bg-white cursor-pointer w-50 h-60 rounded-lg"
            onClick={() => showProduct(data.data)}
        >
            <figure className="relative mb-3 w-full h-4/5">
                <span className="absolute bottom-0 left-0 bg-white/70 rounded-lg text-black text-xs m-3 px-3 py-0.5">{data.data.category.name}</span>
                <img className="w-full h-full object-cover rounded-lg" src={data.data.images[0]} alt={data.data.title} />
                <button 
                    className="absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full m-3 p-1"
                    onClick={() => context.setCounter(context.counter + 1)}
                >
                    <PlusIcon className="w-6 h-6 text-black" />
                </button>
            </figure>
            <p className="flex justify-between">
                <span className="text-sm font-light">{data.data.title}</span>
                <span className="text-lg font-medium">${data.data.price}</span>
            </p>
        </div>
    )
}

export default Card