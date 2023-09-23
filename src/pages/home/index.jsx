import { useContext } from "react";
import Card from "../../components/card";
import ProductDetail from "../../components/productDetail";
import { ShoppingCartContext } from "../../context";

function Home() {
  const context = useContext(ShoppingCartContext);

  const renderView = () => {
    if (context.searchByTitle?.length > 0) {
      if (context.filteredItems?.length > 0) {
        return (
          context.filteredItems?.map(item => (
            <Card key={item.id} data={item} />
          ))
        )
      } else {
        return (
          <div>Product not found!</div>
        )
      }
    } else {
      return (
        context.items?.map(item => (
          <Card key={item.id} data={item} />
        ))
        
      )
    }
  }

    return (
      <div className="flex flex-col items-center">
        <div className='flex w-80 items-center relative justify-center mb-3'>
          <h1 className='font-medium text-xl'>Home</h1>
        </div>
        <input
          className="rounded-lg border border-black w-80 p-3 mb-3 focus:outline-none" 
          type="text" 
          placeholder="Search a product" 
          onChange={(event) => context.setSearchByTitle(event.target.value)}
        />
        <div className="grid gap-3 grid-cols-3 w-full max-w-screen-lg">
        {renderView()}
        </div>
        <ProductDetail />
      </div>
    )
  }
  
export default Home