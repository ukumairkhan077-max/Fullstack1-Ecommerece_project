import featureproduct from "../../assets/images/featured.webp";
function Featurecollection() {
  return (
    <div className="Featurecollection">
      <div className="information">
        <p className="subtitle">Comfort and Style</p>

        <h2>Apparel Made for Your</h2>
        <h2>Everyday Life</h2>

        <p className="description">
          Discover high-quality, comfortable clothes that effortlessly blend
          fashion and function, designed to make you look and feel great every
          day.
        </p>

        <button>Shop Now</button>
      </div>

      <div className="featureproductimage">
        <img src={featureproduct} alt="Feature product" />
      </div>
    </div>
  );
}

export default Featurecollection;