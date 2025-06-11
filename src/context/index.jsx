import { createContext, useState, useEffect } from "react";

export const ShoppingCartContext = createContext();

export const initializeLocalStorage = () => {
    const accountInLocalStorage = localStorage.getItem('account');
    const signOutInLocalStorage = localStorage.getItem('sign-out');

    if (!accountInLocalStorage) {
        localStorage.setItem('account', JSON.stringify({}));
    }

    if (!signOutInLocalStorage) {
        localStorage.setItem('sign-out', JSON.stringify(false));
    }
}

// eslint-disable-next-line react/prop-types
export function ShoppingCartProvider({children}) {
    // My Account
    const [account, setAccount] = useState({});

    // Sign-out
    const [signOut, setSignOut] = useState(false);

    // Shopping cart - counter
    const [counter, setCounter] = useState(0);

    // Product detail - open/close
    const [isProductDetailOpen, setIsProductDetailOpen] =  useState(false);
    
    const openProductDetail = () => {
        closeCheckoutSideMenu();
        setIsProductDetailOpen(true);
    }
    const closeProductDetail = () => setIsProductDetailOpen(false);

    // Product detail - show product
    const [productToShow, setProductToShow] = useState({
        title: "",
        price: "",
        description: "",
        image: '',
    });

    // Shopping Cart
    const [cartProducts, setCartProducts] = useState([]);

    // Checkout Side Menu - open/close
    const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] =  useState(false);
    
    const openCheckoutSideMenu = () => {
        closeProductDetail();
        setIsCheckoutSideMenuOpen(true);
    }
    const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false);

    // Shopping cart - Order
    const [order, setOrder] = useState([]);

    // Get Products
    const [items, setItems] = useState();
    
    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => setItems(data))
        
    }, []);
    
    // Get Products by Title
    const [searchByTitle, setSearchByTitle] = useState();

    
    const [filteredItems, setFilteredItems] = useState();
    console.log(filteredItems);
    
    const filteredItemsByTitle = (items, searchByTitle) => {
        return items?.filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
    }
    
    // Get Products by Category
    const [searchByCategory, setSearchByCategory] = useState();
    console.log(searchByCategory);
    
    const filteredItemsByCategory = (items, searchByCategory) => {
        return items?.filter(item => item.category.toLowerCase().includes(searchByCategory.toLowerCase()))
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

    
    const addProductsToCart = (event, productData) => {
        event.stopPropagation()
        setCartProducts([...cartProducts, productData])
        setCounter(counter + 1)
        openCheckoutSideMenu()
        closeProductDetail()
    }
    
    const removeProductFromCart = (id) => {
        const updatedCart = cartProducts.filter(product => product.id !== id);
        setCartProducts(updatedCart);
    };

    useEffect(() => {
        if (searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_TITLE_AND_CATEGORY', items, searchByTitle, searchByCategory));
        if (searchByTitle && !searchByCategory) setFilteredItems(filterBy('BY_TITLE', items, searchByTitle, searchByCategory));
        if (!searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_CATEGORY', items, searchByTitle, searchByCategory));
        if (!searchByTitle && !searchByCategory) setFilteredItems(filterBy(null, items, searchByTitle, searchByCategory));
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                setSearchByCategory,
                account,
                setAccount,
                signOut,
                setSignOut,
                removeProductFromCart,
                addProductsToCart
            }}
        >
            {children}
        </ShoppingCartContext.Provider>
    )
}