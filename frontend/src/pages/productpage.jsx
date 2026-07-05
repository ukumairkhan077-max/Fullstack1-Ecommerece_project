import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/common/header";
import Footer from "../components/common/footer";
import ProductDetail from "../components/product/productdetail";
import LocalProductDetail from "../components/product/LocalProductDetail";
import { useProducts } from "../context/ProductContext";

const ProductPage = () => {
  const { id } = useParams();
  const { products: localProducts } = useProducts();

  // Check if this is a local product (SKU) or a FakeStore numeric ID
  const localProduct = localProducts.find(p => p.sku === id || p.id === id);

  const [remoteProduct, setRemoteProduct] = useState(null);
  const [loading, setLoading] = useState(!localProduct);

  useEffect(() => {
    if (localProduct) return; // no need to fetch

    async function fetchProduct() {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        setRemoteProduct(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id, localProduct]);

  if (localProduct) {
    return <LocalProductDetail product={localProduct} />;
  }

  if (loading) {
    return <h2 style={{ textAlign: "center", marginTop: "120px" }}>Loading Product...</h2>;
  }

  if (!remoteProduct) {
    return <h2 style={{ textAlign: "center", marginTop: "120px" }}>Product Not Found</h2>;
  }

  return <ProductDetail product={remoteProduct} />;
};

export default ProductPage;
