import { useState, useEffect } from "react";
import { useProducts } from "../../context/ProductContext";
import { useCart } from "../../context/CartContext";

const BestSeller = () => {
  const { products, loading } = useProducts();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  // Pick a random product once the (async) product list has actually
  // loaded. Doing this in an effect — instead of a useState initializer —
  // is what fixes the "Product Not Found" flash: the initializer used to
  // run on the very first render, before ProductContext had finished
  // fetching, so `products` was still `[]` and this froze on `null` forever.
  useEffect(() => {
    if (loading || !products || products.length === 0) return;
    const pick = products[Math.floor(Math.random() * products.length)];
    setProduct(pick);
    setSelectedImage(pick?.images?.[0]?.url ?? "");
    setSelectedSize(pick?.sizes?.[0] ?? "");
    setSelectedColor(pick?.colors?.[0] ?? "");
  }, [products, loading]);

  if (loading) {
    return (
      <section className="bestSeller">
        <h2 className="bestSellerTitle">Best Seller</h2>
        <p style={{ textAlign: "center", color: "#777" }}>Loading…</p>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="bestSeller">
        <h2 className="bestSellerTitle">Best Seller</h2>
        <p style={{ textAlign: "center", color: "#777" }}>No products available yet.</p>
      </section>
    );
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

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        image: product.images?.[0]?.url || "",
        price: product.discountPrice || product.price,
        finalPrice: product.discountPrice || product.price,
      },
      quantity,
      selectedSize,
      selectedColor
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
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
              ${product.discountPrice || product.price}
            </span>

            {product.discountPrice && (
              <span className="oldPrice">
                ${product.price}
              </span>
            )}
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
            className={`cartBtn ${added ? "cartBtn--added" : ""}`}
            onClick={handleAddToCart}
          >
            {added ? "ADDED ✓" : "ADD TO CART"}
          </button>

        </div>

      </div>

    </section>
  );
};

export default BestSeller;
