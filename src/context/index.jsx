import { createContext, useState, useEffect } from "react";

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

    // Shopping Cart
    const [cartProducts, setCartProducts] = useState([]);

    // Checkout Side Menu - open/close
    const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] =  useState(false);
    
    const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true);
    const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false);

    // Shopping cart - Order
    const [order, setOrder] = useState([]);

    // Get Products
    const [items, setItems] = useState();
    
    useEffect(() => {
        fetch('https://api.escuelajs.co/api/v1/products')
        .then(res => res.json())
        .then(data => setItems(data))
        
    }, []);
    
    // Get Products by Title
    const [searchByTitle, setSearchByTitle] = useState();

    
    const [filteredItems, setFilteredItems] = useState();
    
    const filteredItemsByTitle = (items, searchByTitle) => {
        return items?.filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
    }
    
    // Get Products by Category
    const [searchByCategory, setSearchByCategory] = useState();
    console.log(searchByCategory);
    
    const filteredItemsByCategory = (items, searchByCategory) => {
        return items?.filter(item => item.category.name.toLowerCase().includes(searchByCategory.toLowerCase()))
    }
    const filterBy = (searchType, items, searchByTitle, searchByCategory) => {
        if (searchType === 'BY_TITLE') {
            return filteredItemsByTitle(items, searchByTitle)
        }

        if (searchType === 'BY_CATEGORY') {
            return filteredItemsByCategory(items, searchByCategory)
        }

        if (searchType === 'BY_TITLE_AND_CATEGORY') {
            return filteredItemsByCategory(items, searchByCategory).filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
        }

        if (!searchType) {
            return items
        }
    }

    useEffect(() => {
        if (searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_TITLE_AND_CATEGORY', items, searchByTitle, searchByCategory));
        if (searchByTitle && !searchByCategory) setFilteredItems(filterBy('BY_TITLE', items, searchByTitle, searchByCategory));
        if (!searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_CATEGORY', items, searchByTitle, searchByCategory));
        if (!searchByTitle && !searchByCategory) setFilteredItems(filterBy(null, items, searchByTitle, searchByCategory));
    }, [items, searchByTitle, searchByCategory]);

    console.log(searchByTitle);

    return(
        <ShoppingCartContext.Provider 
            value={{
                counter,
                setCounter,
                openProductDetail,
                closeProductDetail,
                isProductDetailOpen,
                productToShow,
                setProductToShow,
                cartProducts,
                setCartProducts,
                isCheckoutSideMenuOpen,
                openCheckoutSideMenu,
                closeCheckoutSideMenu,
                order,
                setOrder,
                items,
                setItems,
                searchByTitle,
                setSearchByTitle,
                filteredItems,
                searchByCategory,
                setSearchByCategory
            }}
        >
            {children}
        </ShoppingCartContext.Provider>
    )
}