import { createContext, useState } from "react";

export const ShoppingCartContext = createContext();

// eslint-disable-next-line react/prop-types
export function ShoppingCartProvider({children}) {
    // Shopping cart - counter
    const [counter, setCounter] = useState(0);

    // Product detail - open/close
    const [isProductDetailOpen, setIsProductDetailOpen] =  useState(false);
    
    const openProductDetail = () => setIsProductDetailOpen(true);
    const closeProductDetail = () => setIsProductDetailOpen(false);

    // Product detail - show product
    const [productToShow, setProductToShow] = useState({
        title: "",
        price: "",
        description: "",
        images: [],
    });

    return(
        <ShoppingCartContext.Provider 
            value={{
                counter,
                setCounter,
                openProductDetail,
                closeProductDetail,
                isProductDetailOpen,
                productToShow,
                setProductToShow
            }}
        >
            {children}
        </ShoppingCartContext.Provider>
    )
}