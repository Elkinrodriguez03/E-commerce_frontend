import { createContext, useState, useEffect } from "react";
import { totalPrice } from '../utils';

export const ShoppingCartContext = createContext();

// eslint-disable-next-line react/prop-types
export function ShoppingCartProvider({children}) {
    const [account, setAccount] = useState({});
    const [signOut, setSignOut] = useState(() => {
        const storedSignOut = localStorage.getItem('sign-out');
        console.log("ShoppingCartProvider: Initializing signOut state...");
        console.log("  localStorage 'sign-out' value:", storedSignOut);
        const initialSignOutValue = storedSignOut ? JSON.parse(storedSignOut) : false;
        console.log("  Parsed initial signOut value:", initialSignOutValue);
        return initialSignOutValue;
    });
    const [counter, setCounter] = useState(0);
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

    const handleCheckout = () => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
        const year = String(today.getFullYear()).slice(-2); // Get last two digits of year
        const formattedDate = `${day}-${month}-${year}`; // e.g., "11.06.25"

        const hours = String(today.getHours()).padStart(2, '0');
        const minutes = String(today.getMinutes()).padStart(2, '0');
        const formattedTime = `${hours}:${minutes}`; // e.g., "14:30"

        const fullDateTime = `${formattedDate} ${formattedTime}`; // e.g., "11.06.25 14:30"

        const orderToAdd = {
            id: crypto.randomUUID(),
            date: fullDateTime,
            products: cartProducts,
            totalProducts: cartProducts.length,
            totalPrice: totalPrice(cartProducts)
        }

        setOrder([...order, orderToAdd])
        setCartProducts([])
        setSearchByTitle(null)
    }

    // Get Products
    const [items, setItems] = useState();
    
    useEffect(() => {
        console.log("ShoppingCartProvider: useEffect (initialization) running.");
        // const storedAccount = localStorage.getItem('account');
        // const storedSignOut = localStorage.getItem('sign-out');

        // if (storedAccount) {
        //     setAccount(JSON.parse(storedAccount));
        // }
        // if (storedSignOut) {
        //     setSignOut(JSON.parse(storedSignOut));
        // }

        fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => setItems(data))
        .catch(error => console.error("Failed to fetch products:", error));        
    }, []);

    useEffect(() => {
        console.log("ShoppingCartProvider: 'signOut' state changed to:", signOut);
        localStorage.setItem('sign-out', JSON.stringify(signOut));
    }, [signOut]);

    useEffect(() => {
        console.log("ShoppingCartProvider: 'account' state changed to:", account);
        localStorage.setItem('account', JSON.stringify(account));
    }, [account]);
    
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
                addProductsToCart,
                handleCheckout
            }}
        >
            {children}
        </ShoppingCartContext.Provider>
    )
}