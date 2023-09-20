import { useState, useEffect } from "react";
import Card from "../../components/card";
import ProductDetail from "../../components/productDetail";

function Home() {
  const [items, setItems] = useState();

  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/products')
      .then(res => res.json())
      .then(data => setItems(data))

  }, []);

    return (
      <div>
        Home
        <div className="grid gap-3 grid-cols-3 w-full max-w-screen-lg">
        {
          items?.map(item => (
            <Card key={item.id} data={item} />
          ))
        }
        </div>
        <ProductDetail />
      </div>
    )
  }
  
export default Home