import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="footer-brand">
              <span className="brand-icon">🍳</span>
              <span className="brand-text">Recipe<span className="text-primary">Hub</span></span>
            </div>
            <p className="footer-description">
              Your ultimate destination for discovering and sharing delicious recipes from around the world.
            </p>
            <div className="social-links">
              <a href="#" className="social-link">📘</a>
              <a href="#" className="social-link">📷</a>
              <a href="#" className="social-link">🐦</a>
              <a href="#" className="social-link">📌</a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/recipes">All Recipes</a></li>
              <li><a href="/categories">Categories</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Categories</h4>
            <ul className="footer-links">
              <li><a href="#">Breakfast</a></li>
              <li><a href="#">Lunch</a></li>
              <li><a href="#">Dinner</a></li>
              <li><a href="#">Desserts</a></li>
              <li><a href="#">Healthy</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact Info</h4>
            <ul className="footer-contact">
              <li>📍 123 Food Street, Culinary City</li>
              <li>📞 +1 (555) 123-4567</li>
              <li>✉️ hello@recipehub.com</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} RecipeHub. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;