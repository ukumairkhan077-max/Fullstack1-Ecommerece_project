import { useState } from "react";
import { useCart } from "../../context/CartContext";

const ProductDetail = ({ product }) => {
  const { addToCart } = useCart();

  const [selectedImage, setSelectedImage] = useState(product.image);
  const colors = ["Black", "White", "Blue", "Gray"];
  const sizes  = ["S", "M", "L", "XL"];
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize,  setSelectedSize]  = useState(sizes[1]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => { if (quantity > 1) setQuantity(prev => prev - 1); };

  const handleAddToCart = () => {
    // Normalise product so CartDrawer can render it
    const normalised = {
      ...product,
      id:         product.id || product.title,
      name:       product.title || product.name,
      image:      product.image,
      finalPrice: product.price,
    };
    addToCart(normalised, quantity, selectedSize, selectedColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <section className="productDetail">
      <div className="productContainer">

        {/* LEFT */}
        <div className="leftSection">
          <div className="thumbnailContainer">
            {[1, 2, 3].map(item => (
              <img
                key={item}
                src={product.image}
                alt={product.title}
                className={`thumbnail ${selectedImage === product.image ? "activeThumbnail" : ""}`}
                onClick={() => setSelectedImage(product.image)}
              />
            ))}
          </div>
          <div className="mainImageContainer">
            <img src={selectedImage} alt={product.title} className="mainImage" />
          </div>
        </div>

        {/* RIGHT */}
        <div className="rightSection">
          <h1>{product.title}</h1>

          <div className="priceSection">
            <span className="currentPrice">${product.price}</span>
            <span className="oldPrice">${(product.price + 20).toFixed(2)}</span>
          </div>

          <div className="rating">
            ⭐ {product.rating.rate}
            <span>({product.rating.count} Reviews)</span>
          </div>

          <p className="description">{product.description}</p>

          {/* COLORS */}
          <div className="optionGroup">
            <h4>Color</h4>
            <div className="colors">
              {colors.map(color => (
                <button
                  key={color}
                  className={`colorBtn ${selectedColor === color ? "activeColor" : ""}`}
                  onClick={() => setSelectedColor(color)}
                >{color}</button>
              ))}
            </div>
          </div>

          {/* SIZES */}
          <div className="optionGroup">
            <h4>Size</h4>
            <div className="sizes">
              {sizes.map(size => (
                <button
                  key={size}
                  className={`sizeBtn ${selectedSize === size ? "activeSize" : ""}`}
                  onClick={() => setSelectedSize(size)}
                >{size}</button>
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
            <div className="characteristicRow"><span>Category</span><span>{product.category}</span></div>
            <div className="characteristicRow"><span>Rating</span><span>{product.rating.rate} ⭐</span></div>
            <div className="characteristicRow"><span>Reviews</span><span>{product.rating.count}</span></div>
            <div className="characteristicRow"><span>Selected Color</span><span>{selectedColor}</span></div>
            <div className="characteristicRow"><span>Selected Size</span><span>{selectedSize}</span></div>
            <div className="characteristicRow"><span>Quantity</span><span>{quantity}</span></div>
          </div>

          {/* ADD TO CART */}
          <button className={`cartBtn ${added ? "cartBtn--added" : ""}`} onClick={handleAddToCart}>
            {added ? "✓ ADDED TO CART" : "ADD TO CART"}
          </button>
        </div>

      </div>
    </section>
  );
};

export default ProductDetail;
