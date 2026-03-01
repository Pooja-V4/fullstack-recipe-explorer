import React, { useState } from 'react';

const RecipeDrawer = ({ recipe, isOpen, onClose }) => {
  const [showTimes, setShowTimes] = useState(false);

  if (!recipe) return null;

  return (
    <div className={`drawer-overlay ${isOpen ? 'show' : ''}`} onClick={onClose}>
      <div className="drawer-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div>
            <span className="badge">{recipe.cuisine}</span>
            <h3>{recipe.title}</h3>
            <div className="text-warning small">
              {"★".repeat(Math.round(recipe.rating))}
              <span className="text-muted opacity-25">
                {"★".repeat(5 - Math.round(recipe.rating))}
              </span>
            </div>
          </div>
          <button className="btn-close" onClick={onClose}></button>
        </div>

        <hr />

        {/* Description */}
        <div className="my-4">
          <h6 className="fw-bold text-uppercase small text-muted">Description</h6>
          <p>{recipe.description || "No description available."}</p>
        </div>

        {/* Time Section */}
        <div className="time-section">
          <div className="time-header" onClick={() => setShowTimes(!showTimes)}>
            <span>Total Time: {recipe.total_time} mins</span>
            <span className={`rotate-180-target ${showTimes ? 'rotate-180' : ''}`}>▼</span>
          </div>
          
          {showTimes && (
            <div className="time-details">
              <div className="time-card">
                <small>Prep</small>
                <span>{recipe.prep_time || '0'} min</span>
              </div>
              <div className="time-card">
                <small>Cook</small>
                <span>{recipe.cook_time || '0'} min</span>
              </div>
            </div>
          )}
        </div>

        {/* Nutrition */}
        {recipe.nutrients && Object.keys(recipe.nutrients).length > 0 && (
          <div className="nutrition-section">
            <h6>Nutritional Information</h6>
            <div className="nutrition-table">
              <table>
                <tbody>
                  {Object.entries(recipe.nutrients).map(([key, value]) => (
                    <tr key={key}>
                      <td>{key.replace(/([A-Z])/g, ' $1')}</td>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Action Button */}
        {recipe.URL && (
          <a href={recipe.URL} target="_blank" rel="noopener noreferrer" className="btn-dark">
            View Full Instructions <span>→</span>
          </a>
        )}
      </div>
    </div>
  );
};

export default RecipeDrawer;