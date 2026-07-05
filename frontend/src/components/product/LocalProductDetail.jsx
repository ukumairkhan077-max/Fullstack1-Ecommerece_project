import { useState } from "react";
import { useCart } from "../../context/CartContext";
import Header from "../common/header";
import Footer from "../common/footer";

const LocalProductDetail = ({ product }) => {
  const { addToCart } = useCart();

  const images = product.images || [];
  const [selectedImage, setSelectedImage] = useState(images[0]?.url || "");
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "");
  const [selectedSize,  setSelectedSize]  = useState(product.sizes?.[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const increaseQuantity = () => setQuantity(p => p + 1);
  const decreaseQuantity = () => { if (quantity > 1) setQuantity(p => p - 1); };

  const handleAddToCart = () => {
    const normalised = {
      ...product,
      id:         product.sku,
      name:       product.name,
      image:      images[0]?.url || "",
      finalPrice: product.discountPrice || product.price,
    };
    addToCart(normalised, quantity, selectedSize, selectedColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const displayPrice   = product.discountPrice || product.price;
  const originalPrice  = product.discountPrice ? product.price : null;

  return (
    <>
      <Header />
      <section className="productDetail">
        <div className="productContainer">

          {/* LEFT */}
          <div className="leftSection">
            <div className="thumbnailContainer">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img.url}
                  alt={img.altText}
                  className={`thumbnail ${selectedImage === img.url ? "activeThumbnail" : ""}`}
                  onClick={() => setSelectedImage(img.url)}
                />
              ))}
            </div>
            <div className="mainImageContainer">
              <img src={selectedImage} alt={product.name} className="mainImage" />
            </div>
          </div>

          {/* RIGHT */}
          <div className="rightSection">
            <h1>{product.name}</h1>

            <div className="priceSection">
              <span className="currentPrice">${displayPrice}</span>
              {originalPrice && <span className="oldPrice">${originalPrice}</span>}
            </div>

            <div className="rating">
              ⭐ {product.rating}
              <span>({product.numReviews} Reviews)</span>
            </div>

            <p className="description">{product.description}</p>

            {/* COLORS */}
            {product.colors?.length > 0 && (
              <div className="optionGroup">
                <h4>Color</h4>
                <div className="colors">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      className={`colorBtn ${selectedColor === color ? "activeColor" : ""}`}
                      onClick={() => setSelectedColor(color)}
                    >{color}</button>
                  ))}
                </div>
              </div>
            )}

            {/* SIZES */}
            {product.sizes?.length > 0 && (
              <div className="optionGroup">
                <h4>Size</h4>
                <div className="sizes">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      className={`sizeBtn ${selectedSize === size ? "activeSize" : ""}`}
                      onClick={() => setSelectedSize(size)}
                    >{size}</button>
                  ))}
                </div>
              </div>
            )}

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
              <div className="characteristicRow"><span>Brand</span><span>{product.brand}</span></div>
              <div className="characteristicRow"><span>Material</span><span>{product.material}</span></div>
              <div className="characteristicRow"><span>Category</span><span>{product.category}</span></div>
              <div className="characteristicRow"><span>Gender</span><span>{product.gender}</span></div>
              <div className="characteristicRow"><span>Collection</span><span>{product.collections}</span></div>
              <div className="characteristicRow">
                <span>Stock</span>
                <span style={{ color: product.countInStock > 0 ? "#16a34a" : "#e5391c" }}>
                  {product.countInStock > 0 ? `In Stock (${product.countInStock})` : "Out of Stock"}
                </span>
              </div>
              <div className="characteristicRow"><span>Rating</span><span>⭐ {product.rating} ({product.numReviews})</span></div>
            </div>

            <button className={`cartBtn ${added ? "cartBtn--added" : ""}`} onClick={handleAddToCart}>
              {added ? "✓ ADDED TO CART" : "ADD TO CART"}
            </button>
          </div>

        </div>
      </section>
      <Footer />
    </>
  );
};

export default LocalProductDetail;
