import { useRoutes, BrowserRouter } from 'react-router-dom';
import Home from '../home';
import MyAccount from '../myAccount/index';
import MyOrder from '../myOrder/index';
import MyOrders from '../myOrders/index';
import SignIn from '../signIn/index'
import NotFound from '../notFound/index';
import Navbar from '../../components/navbar';
import './App.css';

const AppRoutes = () => {
    let routes = useRoutes([
        { path: '/', element: <Home /> },
        { path: '/my-account', element: <MyAccount /> },
        { path: '/my-order', element: <MyOrder /> },
        { path: '/my-orders', element: <MyOrders /> },
        { path: '/sign-in', element: <SignIn /> },
        { path: '/*', element: <NotFound /> },
    ]);
    
    return routes
}

function App() {
    return (
        <BrowserRouter>
            <AppRoutes />
            <Navbar />
        </BrowserRouter>
    )
}
export default App
