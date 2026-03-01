import React from 'react';

const RecipeGrid = ({ recipes, loading, onRecipeClick }) => {
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="text-primary fw-semibold mb-3">Fetching delicious recipes...</p>
        <div className="d-flex justify-content-center gap-2 flex-wrap">
          <span className="badge bg-dark text-light px-3 py-2 animate-fadeIn border border-secondary border-opacity-25">
            🍕 Italian
          </span>
          <span className="badge bg-dark text-light px-3 py-2 animate-fadeIn border border-secondary border-opacity-25">
            🍜 Asian
          </span>
          <span className="badge bg-dark text-light px-3 py-2 animate-fadeIn border border-secondary border-opacity-25">
            🌮 Mexican
          </span>
          <span className="badge bg-dark text-light px-3 py-2 animate-fadeIn border border-secondary border-opacity-25">
            🥗 Healthy
          </span>
          <span className="badge bg-dark text-light px-3 py-2 animate-fadeIn border border-secondary border-opacity-25">
            🍰 Desserts
          </span>
        </div>
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">🔍</div>
        <h5>No recipes match your search</h5>
        <p className="text-muted">Try searching for something else or clear the filter</p>
        <button className="btn-outline-primary" onClick={() => window.location.reload()}>
          Refresh Recipes
        </button>
      </div>
    );
  }

  // Helper function to get top 3 nutrients
  const getTopNutrients = (nutrients) => {
    if (!nutrients) return [];
    return Object.entries(nutrients)
      .filter(([key]) => ['calories', 'protein', 'carbs', 'fat'].includes(key.toLowerCase()))
      .slice(0, 3);
  };

  return (
    <div className="recipes-grid">
      {recipes.map((recipe, index) => {
        const topNutrients = getTopNutrients(recipe.nutrients);
        
        return (
          <div 
            key={recipe._id} 
            className="recipe-card"
            onClick={() => onRecipeClick(recipe)}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Image Container with Recipe Name Overlay - Transparent */}
            <div className="card-image-container">
              {/* Transparent background with recipe name */}
              <div className="recipe-name-background">
                <h2 className="recipe-name-large">
                  {recipe.title}
                </h2>
              </div>
              
              {/* Gradient overlay */}
              <div className="image-overlay"></div>
              
              {/* Cuisine Badge */}
              <span className="image-cuisine-badge">{recipe.cuisine}</span>
              
              {/* Rating Badge */}
              <div className="image-rating-badge">
                <span className="stars">
                  {"★".repeat(Math.round(recipe.rating))}
                </span>
                <span className="rating-number">{recipe.rating}</span>
              </div>
            </div>
            
            <div className="card-body">
              {/* Description Preview */}
              {recipe.description && (
                <p className="card-description">
                  {recipe.description.length > 80 
                    ? `${recipe.description.substring(0, 80)}...` 
                    : recipe.description}
                </p>
              )}

              {/* Nutrients Preview with Rating */}
              {topNutrients.length > 0 && (
                <div className="nutrients-preview">
                  {/* Star Rating */}
                  <span className="nutrient-tag rating-tag">
                    <strong>⭐ {recipe.rating}</strong>
                  </span>
                  {/* Nutrients */}
                  {topNutrients.map(([key, value]) => (
                    <span key={key} className="nutrient-tag">
                      <strong>{value}</strong> {key}
                    </span>
                  ))}
                </div>
              )}

              {/* View Details Button */}
              <button className="view-details-btn">
                <span>View Recipe</span>
                <span>→</span>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RecipeGrid;