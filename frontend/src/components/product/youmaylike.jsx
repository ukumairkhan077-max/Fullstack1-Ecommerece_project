import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const YouMayAlsoLike = () => {
  const [mensProducts, setMensProducts] = useState([]);
  const [womensProducts, setWomensProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(
          "https://fakestoreapi.com/products"
        );

        const data = await response.json();

        const men = data.filter(
          (item) => item.category === "men's clothing"
        );

        const women = data.filter(
          (item) => item.category === "women's clothing"
        );

        setMensProducts(men);
        setWomensProducts(women);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <h2
        style={{
          textAlign: "center",
          margin: "80px 0",
        }}
      >
        Loading Products...
      </h2>
    );
  }

  return (
    <section className="youMayLike">

      <h2>You May Also Like</h2>

      {/* MEN */}

      <div className="categorySection">

        <h3>Men's Collection</h3>

        <div className="productSlider">

          {mensProducts.map((product) => (

            <div
              key={product.id}
              className="productCard"
              onClick={() => navigate(`/product/${product.id}`)}
            >

              <div className="imageBox">

                <img
                  src={product.image}
                  alt={product.title}
                />

              </div>

              <h4>
                {product.title.length > 35
                  ? product.title.slice(0, 35) + "..."
                  : product.title}
              </h4>

              <p>${product.price}</p>

            </div>

          ))}

        </div>

      </div>

      {/* WOMEN */}

      <div className="categorySection">

        <h3>Women's Collection</h3>

        <div className="productSlider">

          {womensProducts.map((product) => (

            <div
              key={product.id}
              className="productCard"
              onClick={() => navigate(`/product/${product.id}`)}
            >

              <div className="imageBox">

                <img
                  src={product.image}
                  alt={product.title}
                />

              </div>

              <h4>
                {product.title.length > 35
                  ? product.title.slice(0, 35) + "..."
                  : product.title}
              </h4>

              <p>${product.price}</p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default YouMayAlsoLike;