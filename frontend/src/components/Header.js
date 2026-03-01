import React, { useState, useEffect } from 'react';

const Header = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (section) => {
    setActiveSection(section);
    setIsMenuOpen(false);
    
    if (onNavigate) {
      onNavigate(section);
    }
  };

  return (
    <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
      <nav className="navbar">
        <div className="container">
          {/* Logo/Brand */}
          <a 
            href="#home" 
            className="navbar-brand"
            onClick={(e) => {
              e.preventDefault();
              handleNavigation('home');
            }}
          >
            <span className="brand-icon">🍳</span>
            <span className="brand-text">Recipe<span className="text-primary">Hub</span></span>
          </a>

          {/* Desktop Navigation */}
          <div className="nav-menu-desktop">
            <ul className="nav-list">
              <li className="nav-item">
                <a 
                  href="#home" 
                  className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation('home');
                  }}
                >
                  <span className="nav-icon">🏠</span>
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a 
                  href="#recipes" 
                  className={`nav-link ${activeSection === 'recipes' ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation('recipes');
                  }}
                >
                  <span className="nav-icon">🍽️</span>
                  Recipe Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a 
                  href="#contact" 
                  className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation('contact');
                  }}
                >
                  <span className="nav-icon">📞</span>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}></span>
          </button>

          {/* Mobile Navigation */}
          <div className={`nav-menu-mobile ${isMenuOpen ? 'show' : ''}`}>
            <ul className="nav-list-mobile">
              <li className="nav-item-mobile">
                <a 
                  href="#home" 
                  className={`nav-link-mobile ${activeSection === 'home' ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation('home');
                  }}
                >
                  <span className="nav-icon">🏠</span>
                  Home
                </a>
              </li>
              <li className="nav-item-mobile">
                <a 
                  href="#recipes" 
                  className={`nav-link-mobile ${activeSection === 'recipes' ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation('recipes');
                  }}
                >
                  <span className="nav-icon">🍽️</span>
                  Recipe Dashboard
                </a>
              </li>
              <li className="nav-item-mobile">
                <a 
                  href="#contact" 
                  className={`nav-link-mobile ${activeSection === 'contact' ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation('contact');
                  }}
                >
                  <span className="nav-icon">📞</span>
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;