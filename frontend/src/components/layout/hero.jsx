import rabbit from "../../assets/images/rabbit-hero.webp";

function Hero() {
  return (
    <section className="hero-section">
      <img src={rabbit} alt="Rabbit Hero" className="hero-image" />

      <div className="hero-overlay">
        <h2>Vacation Ready</h2>

        <p>
          Explore our vacation-ready collection and discover
          your perfect look for every getaway.
        </p>

        <button className="shop-btn">
          Shop Now
        </button>
      </div>
    </section>
  );
}

export default Hero;