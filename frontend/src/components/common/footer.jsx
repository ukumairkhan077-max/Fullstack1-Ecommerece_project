import facebook from "../../assets/images/facebook.svg";
import instagram from "../../assets/images/instagram.svg";
import twitter from "../../assets/images/twitter.svg";
function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Newsletter */}

        <div className="footer-column">

          <h3>Newsletter</h3>

          <p>
            Be the first to hear about new products,
            exclusive events, and online offers.
          </p>

          <p>Sign up and get 10% off your first order.</p>

          <div className="subscribe-box">
            <input
              type="email"
              placeholder="Enter your email"
            />

            <button>Subscribe</button>
          </div>

        </div>

        {/* Shop */}

        <div className="footer-column">

          <h3>Shop</h3>

          <ul>
            <li>Men's Top Wear</li>
            <li>Women's Top Wear</li>
            <li>Men's Bottom Wear</li>
            <li>Women's Bottom Wear</li>
          </ul>

        </div>

        {/* Support */}

        <div className="footer-column">

          <h3>Support</h3>

          <ul>
            <li>Contact Us</li>
            <li>About Us</li>
            <li>FAQs</li>
            <li>Features</li>
          </ul>

        </div>

        {/* Follow Us */}

        <div className="footer-column">

          <h3>Follow Us</h3>

          <div className="footer-social">

            <img src={facebook} alt="facebook" />
            <img src={instagram} alt="instagram" />
            <img src={twitter} alt="twitter" />

          </div>

          <h4>Call Us</h4>

          <p>0123-456-789</p>

        </div>

      </div>

      <hr />

      <p className="copyright">
        © 2025, CompileTab. All Rights Reserved.
      </p>

    </footer>
  );
}

export default Footer;