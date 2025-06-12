import { useContext } from "react"
import OrderCard from "../../components/orderCard"
import { ShoppingCartContext } from "../../context"
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

function MyOrder() {
  const context = useContext(ShoppingCartContext);
  const currentPath = window.location.pathname;
  let index = currentPath.substring(currentPath.lastIndexOf('/') + 1);
  if (index === 'last') {
    index = context.order?.length - 1
  }

    return (
      <div className="m-10">
        <div className='flex w-full items-center relative justify-center'>
          <Link to='/my-orders' className='absolute left-0'>
            <ChevronLeftIcon className='h-6 w-6 text-black cursor-pointer' />
          </Link>
          <h1 className="font-semibold text-xl">My Order</h1>
        </div>
        <div className="bg-white p-5 mt-5 flex flex-col rounded-xl w-full shadow-lg">
          {
            context.order?.[index]?.products.map(product => (
              <OrderCard 
                key={product.id}
                id={product.id}
                title={product.title}
                imageUrl={product.image}
                price={product.price}
              />
            ))
          }
        </div>
      </div>
    )
  }
  
export default MyOrder;