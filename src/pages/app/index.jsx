import { useRoutes, BrowserRouter } from 'react-router-dom';
import { ShoppingCartProvider } from '../../context';
import Home from '../home';
import MyAccount from '../myAccount/index';
import MyOrder from '../myOrder/index';
import MyOrders from '../myOrders/index';
import SignIn from '../signIn/index'
import NotFound from '../notFound/index';
import Navbar from '../../components/navbar';
import CheckoutSideMenu from '../../components/checkoutSideMenu';
import './App.css';

const AppRoutes = () => {
    let routes = useRoutes([
        { path: '/', element: <Home /> },
        { path: '/clothes', element: <Home /> },
        { path: '/electronics', element: <Home /> },
        { path: '/jewelery', element: <Home /> },
        { path: '/others', element: <Home /> },
        { path: '/my-account', element: <MyAccount /> },
        { path: '/my-order', element: <MyOrder /> },
        { path: '/my-orders', element: <MyOrders /> },
        { path: '/my-orders/last', element: <MyOrder /> },
        { path: '/my-orders/:id', element: <MyOrder /> },
        { path: '/sign-in', element: <SignIn /> },
        { path: '/*', element: <NotFound /> },
    ]);
    
    return routes
}

function App() {
    return (
        <ShoppingCartProvider>
        <BrowserRouter>
            <AppRoutes />
            <Navbar />
            <CheckoutSideMenu />
        </BrowserRouter>            
        </ShoppingCartProvider>
    )
}
export default App
