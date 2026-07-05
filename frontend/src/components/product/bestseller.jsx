import { useState } from "react";
import { useProducts } from "../../context/ProductContext";

const BestSeller = () => {
  const { products } = useProducts();

  // Random Product
  const [product] = useState(() => {
    if (!products || products.length === 0) return null;
    return products[Math.floor(Math.random() * products.length)];
  });

  // States (initialized from the product directly, since product never
  // changes after the first render)
  const [selectedImage, setSelectedImage] = useState(
    () => product?.images?.[0]?.url ?? ""
  );
  const [selectedSize, setSelectedSize] = useState(
    () => product?.sizes?.[0] ?? ""
  );
  const [selectedColor, setSelectedColor] = useState(
    () => product?.colors?.[0] ?? ""
  );
  const [quantity, setQuantity] = useState(1);

  // Prevent crashes if no product exists
  if (!product) {
    return <h2>No Product Found</h2>;
  }

  // Quantity Functions
  const increaseQuantity = () => {
    if (quantity < product.countInStock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <section className="bestSeller">

      <h2 className="bestSellerTitle">Best Seller</h2>

      <div className="bestSellerContainer">

        {/* LEFT SIDE */}

        <div className="leftSection">

          <div className="thumbnailContainer">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText}
                className={`thumbnail ${
                  selectedImage === image.url ? "activeThumbnail" : ""
                }`}
                onClick={() => setSelectedImage(image.url)}
              />
            ))}
          </div>

          <div className="mainImageContainer">
            <img
              src={selectedImage}
              alt={product.name}
              className="mainImage"
            />
          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="rightSection">

          <h1>{product.name}</h1>

          <div className="price">
            <span className="currentPrice">
              ${product.discountPrice}
            </span>

            <span className="oldPrice">
              ${product.price}
            </span>
          </div>

          <p className="description">
            {product.description}
          </p>

          {/* COLORS */}

          <div className="optionGroup">

            <h4>Color</h4>

            <div className="colors">
              {product.colors.map((color) => (
                <button
                  key={color}
                  className={`colorBtn ${
                    selectedColor === color ? "activeColor" : ""
                  }`}
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </button>
              ))}
            </div>

          </div>

          {/* SIZES */}

          <div className="optionGroup">

            <h4>Size</h4>

            <div className="sizes">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`sizeBtn ${
                    selectedSize === size ? "activeSize" : ""
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>

          </div>

          {/* QUANTITY */}

          <div className="optionGroup">

            <h4>Quantity</h4>

            <div className="quantityBox">

              <button onClick={decreaseQuantity}>−</button>

              <span>{quantity}</span>

              <button onClick={increaseQuantity}>+</button>

            </div>

          </div>

          {/* CHARACTERISTICS */}

          <div className="characteristics">

            <h3>Characteristics</h3>

            <div className="characteristicRow">
              <span>Brand</span>
              <span>{product.brand}</span>
            </div>

            <div className="characteristicRow">
              <span>Material</span>
              <span>{product.material}</span>
            </div>

            <div className="characteristicRow">
              <span>Category</span>
              <span>{product.category}</span>
            </div>

            <div className="characteristicRow">
              <span>Gender</span>
              <span>{product.gender}</span>
            </div>

            <div className="characteristicRow">
              <span>Collection</span>
              <span>{product.collections}</span>
            </div>

            <div className="characteristicRow">
              <span>Stock</span>
              <span>{product.countInStock}</span>
            </div>

            <div className="characteristicRow">
              <span>Rating</span>
              <span>
                ⭐ {product.rating} ({product.numReviews})
              </span>
            </div>

          </div>

          {/* ADD TO CART */}

          <button
            className="cartBtn"
            onClick={() =>
              console.log({
                product,
                quantity,
                selectedColor,
                selectedSize,
              })
            }
          >
            ADD TO CART
          </button>

        </div>

      </div>

    </section>
  );
};

export default BestSeller;