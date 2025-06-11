import { useContext } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { ShoppingCartContext } from "../../context";

function ProductDetail() {
  const context = useContext(ShoppingCartContext);

  return (
    <aside
      className={`${
        context.isProductDetailOpen ? "flex" : "hidden"
      } flex-col fixed top-0 md:top-20 right-0 border rounded-xl bg-white z-40 w-full md:w-[360px] overflow-y-auto h-screen md:h-[calc(100vh-80px)] shadow-xl`}
    >
      <div className="flex justify-between items-center p-5">
        <h2 className="font-medium text-xl">Detail</h2>
        <div>
          <XMarkIcon
            className="h-6 w-6 text-black cursor-pointer"
            onClick={() => context.closeProductDetail()}
          />
        </div>
      </div>
      <figure className="px-6">
        <img
          className="w-full h-full max-h-80 object-scale-down rounded-lg"
          src={context.productToShow.image}
          alt={context.productToShow.title}
        />
      </figure>
      <p className="flex flex-col p-6">
        <span className="font-medium text-2x1 mb-2">
          ${context.productToShow.price}
        </span>
        <span className="font-medium text-md">
          {context.productToShow.title}
        </span>
        <span className="font-light text-xs">
          {context.productToShow.description}
        </span>
      </p>
      <div className="items-center p-6 fixed bottom-0 left-0 right-0 md:absolute">
        <button
          className="bg-black py-3 text-white w-full rounded-lg"
          onClick={(event) => context.addProductsToCart(event, context.productToShow)}
        >
          Add to Cart
        </button>        
      </div>
    </aside>
  );
}

export default ProductDetail;
