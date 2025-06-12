import { useContext } from 'react';
import OrdersCard from '../../components/ordersCard';
import { ShoppingCartContext } from '../../context';
import { Link } from 'react-router-dom';

function MyOrders() {
  const context = useContext(ShoppingCartContext);

    return (
      <div className='flex flex-col items-center justify-center w-full h-full'>
        <div className='mt-10 mb-5'>
          <h1 className='font-semibold text-xl'>My Orders</h1>
        </div>
        {
          context.order.map((order, index) => (
            <Link key={index} to={`/my-orders/${index}`}>
              <OrdersCard 
                date={order.date}
                totalPrice={order.totalPrice}
                totalProducts={order.totalProducts}
              />
            </Link>            
          )
      )
        }
      </div>
    )
  }
  
export default MyOrders;