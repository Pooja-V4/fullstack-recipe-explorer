import React from 'react';

const Hero = ({ totalRecipes, onExploreClick }) => {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-content">
          <span className="hero-badge">🍳 Welcome to RecipeHub</span>
          <h1 className="hero-title">
            Discover & Cook 
            <span className="hero-highlight"> Delicious Recipes</span>
          </h1>
          <p className="hero-subtitle">
            Explore thousands of mouth-watering recipes from around the world, 
            carefully curated for food lovers like you
          </p>
          
          <div className="hero-actions">
            <button onClick={onExploreClick} className="explore-btn">
              <span className="btn-text">Explore Recipes</span>
              <span className="btn-icon">→</span>
              <span className="btn-glow"></span>
            </button>
            
            <div className="featured-badge">
              <span className="featured-icon">✨</span>
              <span className="featured-text">{totalRecipes}+ Recipes</span>
            </div>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Recipes</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">50+</span>
              <span className="stat-label">Cuisines</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">10k+</span>
              <span className="stat-label">Happy Cooks</span>
            </div>
          </div>
        </div>
        
        <div className="hero-decoration">
          <div className="floating-ingredient">🥑</div>
          <div className="floating-ingredient">🍅</div>
          <div className="floating-ingredient">🧀</div>
          <div className="floating-ingredient">🌶️</div>
          <div className="floating-ingredient">🧄</div>
        </div>
      </div>
    </section>
  );
};

export default Hero;