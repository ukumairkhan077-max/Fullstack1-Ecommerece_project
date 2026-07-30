import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/common/header";
import Footer from "../components/common/footer";
import LocalProductDetail from "../components/product/LocalProductDetail";
import { useProducts } from "../context/ProductContext";
import api from "../services/api";

const ProductPage = () => {
  const { id } = useParams();
  const { getProduct, loading: catalogueLoading } = useProducts();

  // Prefer whatever's already loaded in the shared catalogue (fast path —
  // no extra request). If it isn't there yet (e.g. this product was opened
  // directly via a link before the full catalogue finished loading), fetch
  // it individually straight from the backend by its real MongoDB id.
  const cachedProduct = getProduct(id);

  const [fetchedProduct, setFetchedProduct] = useState(null);
  const [fetching, setFetching] = useState(!cachedProduct);
  const [error, setError] = useState("");

  useEffect(() => {
    if (cachedProduct || catalogueLoading) return;

    let cancelled = false;
    setFetching(true);
    setError("");

    api.getProduct(id)
      .then((data) => {
        if (cancelled) return;
        setFetchedProduct({ ...data, id: data._id || data.id });
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.message || "Could not load this product.");
      })
      .finally(() => {
        if (!cancelled) setFetching(false);
      });

    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, cachedProduct, catalogueLoading]);

  const product = cachedProduct || fetchedProduct;

  if (product) {
    return <LocalProductDetail product={product} />;
  }

  if (catalogueLoading || fetching) {
    return (
      <>
        <Header />
        <h2 style={{ textAlign: "center", marginTop: "120px" }}>Loading Product...</h2>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <h2 style={{ textAlign: "center", marginTop: "120px" }}>
        {error || "Product Not Found"}
      </h2>
      <Footer />
    </>
  );
};

export default ProductPage;