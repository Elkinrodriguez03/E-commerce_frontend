export const totalPrice = (products) => {
    let sum = 0;
    products.forEach(product => sum += product.price);
    return sum.toFixed(2);
}

export const initializeLocalStorage = () => {
    const accountInLocalStorage = localStorage.getItem('account');
    const signOutInLocalStorage = localStorage.getItem('sign-out');

    // Ensure account is initialized as an empty object if not present
    if (!accountInLocalStorage) {
        localStorage.setItem('account', JSON.stringify({}));
    }

    // Ensure sign-out is initialized as false if not present
    if (!signOutInLocalStorage) {
        localStorage.setItem('sign-out', JSON.stringify(false));
    }
}