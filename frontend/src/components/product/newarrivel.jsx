import { useEffect, useState } from "react";
import { getNewArrivals } from "../../services/productservice";

function NewArrival() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const data = await getNewArrivals();
      setProducts(data);
    }

    loadProducts();
  }, []);

  return (
    <section className="new-arrival">

      <h2>New Arrivals</h2>

      <div className="product-container">

        {products.map((product) => (

          <div className="product-card" key={product.id}>

            <img
              src={product.image}
              alt={product.title}
            />

            <h3>{product.title}</h3>

            <p>{product.category}</p>

            <span>${product.price}</span>

          </div>

        ))}

      </div>

    </section>
  );
}

export default NewArrival;