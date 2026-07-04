export async function getNewArrivals() {
  const response = await fetch("https://fakestoreapi.com/products");

  const data = await response.json();

  // Only keep clothing products
  const clothes = data.filter(
    (product) =>
      product.category === "men's clothing" ||
      product.category === "women's clothing"
  );

  // Shuffle
  const shuffled = clothes.sort(() => Math.random() - 0.5);

  // Return only 8 products
  return shuffled.slice(0, 8);
}