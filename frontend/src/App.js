import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import RecipeGrid from './components/RecipeTable';
import RecipeDrawer from './components/RecipeDrawer';
import Hero from './components/Hero';
import Footer from './components/Footer';
import Header from './components/Header';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  
  // Refs to track state changes
  const homeRef = useRef(null);
  const recipesRef = useRef(null);
  const contactRef = useRef(null);
  const recipesSectionRef = useRef(null);
  const previousSearchRef = useRef("");
  const previousLimitRef = useRef(12);

  const fetchRecipes = async (skipScroll = false) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/recipes`, {
        params: { page, limit, search, sort: 'rating' }
      });
      setRecipes(response.data.data);
      setTotal(response.data.total);
      
      // Only scroll on manual pagination, not on search or limit change
      if (!skipScroll) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Skip scroll if search or limit just changed
    const searchJustChanged = search !== previousSearchRef.current;
    const limitJustChanged = limit !== previousLimitRef.current;
    fetchRecipes(searchJustChanged || limitJustChanged);
    previousSearchRef.current = search;
    previousLimitRef.current = limit;
  }, [page, limit, search]);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      if (search) {
        setPage(1);
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [search]);

  const scrollToRecipes = () => {
    if (recipesSectionRef.current) {
      recipesSectionRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  };
  
  const handleNavigation = (section) => {
    let targetRef;
    
    switch(section) {
      case 'home':
        targetRef = homeRef;
        break;
      case 'recipes':
        targetRef = recipesRef;
        break;
      case 'contact':
        targetRef = contactRef;
        break;
      default:
        targetRef = homeRef;
    }
    
    if (targetRef && targetRef.current) {
      targetRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  };

  return (
    <>
      <Header onNavigate={handleNavigation} />
      
      {/* Home Section with homeRef */}
      <div ref={homeRef}>
        <Hero 
          totalRecipes={total} 
          onExploreClick={scrollToRecipes}
        />
      </div>
      
      {/* Main Content - Recipes Section with both refs */}
      <div 
        ref={(el) => {
          // Assign to both refs for compatibility
          recipesSectionRef.current = el;
          recipesRef.current = el;
        }} 
        className="container"
      >
        <div className="glass-card">
          <div className="dashboard-header">
            <h2>Recipe Dashboard</h2>
            <div className="d-flex gap-2">
              <span className="badge bg-primary bg-opacity-10 text-primary px-4 py-2 rounded-pill">
                🍽️ {total} Recipes
              </span>
            </div>
          </div>
          
          <div className="controls-wrapper">
            <div className="row g-3">
              <div className="col-md-8">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="🔍 Search for delicious recipes..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="col-md-4">
                <select className="form-select" value={limit} onChange={(e) => setLimit(Number(e.target.value))}>
                  <option value="12">✨ 12 per page</option>
                  <option value="24">🔥 24 per page</option>
                  <option value="36">🚀 36 per page</option>
                </select>
              </div>
            </div>
          </div>

          <RecipeGrid 
            recipes={recipes} 
            loading={loading} 
            onRecipeClick={(recipe) => setSelectedRecipe(recipe)} 
          />

          <div className="pagination-controls">
            <button 
              className="btn-pagination" 
              disabled={page === 1} 
              onClick={() => setPage(page - 1)}
            >
              ← Previous
            </button>
            <span className="page-info">
              Page {page} of {Math.ceil(total / limit) || 1}
            </span>
            <button 
              className="btn-pagination" 
              disabled={page >= Math.ceil(total / limit)} 
              onClick={() => setPage(page + 1)}
            >
              Next →
            </button>
          </div>
        </div>
      </div>

      {/* Contact Section with contactRef */}
      <div ref={contactRef}>
        <Footer />
      </div>

      <RecipeDrawer 
        recipe={selectedRecipe} 
        isOpen={!!selectedRecipe} 
        onClose={() => setSelectedRecipe(null)} 
      />
    </>
  );
}

export default App;