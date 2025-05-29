import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useWalkthroughs from '../hooks/useWalkthroughs';

const HTBList = () => {
  const { walkthroughs, loading } = useWalkthroughs();
  const [filteredWalkthroughs, setFilteredWalkthroughs] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    difficulty: 'all',
    os: 'all'
  });

  useEffect(() => {
    applyFilters();
  }, [filters, walkthroughs]);

  const applyFilters = () => {
    let filtered = walkthroughs;

    // Apply search filter
    if (filters.search) {
      filtered = filtered.filter(walkthrough => 
        walkthrough.machine_name?.toLowerCase().includes(filters.search.toLowerCase()) ||
        walkthrough.techniques?.some(tech => 
          tech.toLowerCase().includes(filters.search.toLowerCase())
        )
      );
    }

    // Apply difficulty filter
    if (filters.difficulty !== 'all') {
      filtered = filtered.filter(walkthrough =>
        walkthrough.difficulty?.toLowerCase() === filters.difficulty
      );
    }

    // Apply OS filter
    if (filters.os !== 'all') {
      filtered = filtered.filter(walkthrough =>
        walkthrough.os?.toLowerCase() === filters.os
      );
    }

    setFilteredWalkthroughs(filtered);
  };

  const handleSearchChange = (e) => {
    setFilters(prev => ({ ...prev, search: e.target.value }));
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  if (loading) {
    return (
      <div className="container">
        <header className="header">
          <h1>HackTheBox Walkthroughs</h1>
          <p style={{ textAlign: 'center' }}>
            <Link to="/">← Back to Home</Link>
          </p>
        </header>
        <p>Loading walkthroughs...</p>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Rest of your HTBList component stays the same */}
      <header className="header">
        <h1>HackTheBox Walkthroughs</h1>
        <p style={{ textAlign: 'center' }}>
          <Link to="/">← Back to Home</Link>
        </p>
      </header>

      <section className="search-filters">
        <div className="search-box">
          <input
            type="text"
            id="search-input"
            placeholder="Search machines or techniques..."
            value={filters.search}
            onChange={handleSearchChange}
          />
        </div>
        
        <div className="filter-buttons">
          <div className="filter-group">
            <label>Difficulty:</label>
            {['all', 'easy', 'medium', 'hard'].map(difficulty => (
              <button
                key={difficulty}
                className={`filter-btn ${filters.difficulty === difficulty ? 'active' : ''}`}
                onClick={() => handleFilterChange('difficulty', difficulty)}
              >
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </button>
            ))}
          </div>
          
          <div className="filter-group">
            <label>OS:</label>
            {['all', 'windows', 'linux'].map(os => (
              <button
                key={os}
                className={`filter-btn ${filters.os === os ? 'active' : ''}`}
                onClick={() => handleFilterChange('os', os)}
              >
                {os.charAt(0).toUpperCase() + os.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section>
        <h2>Walkthroughs ({filteredWalkthroughs.length})</h2>
        
        {filteredWalkthroughs.length > 0 ? (
          <div className="walkthrough-grid">
            {filteredWalkthroughs.map((walkthrough, index) => (
              <div key={index} className="walkthrough-card">
                <div className="card-header">
                  <h3>
                    <Link to={`/htb/${walkthrough.slug}`}>
                      {walkthrough.machine_name}
                    </Link>
                  </h3>
                  <span className={`difficulty difficulty-${walkthrough.difficulty?.toLowerCase()}`}>
                    {walkthrough.difficulty}
                  </span>
                </div>
                
                <div className="card-content">
                  <p><strong>OS:</strong> {walkthrough.os}</p>
                  <p><strong>Completed:</strong> {walkthrough.date_completed}</p>
                  
                  {walkthrough.techniques && (
                    <div className="techniques">
                      {walkthrough.techniques.slice(0, 3).map((technique, techIndex) => (
                        <span key={techIndex} className="technique-tag">
                          {technique}
                        </span>
                      ))}
                      {walkthrough.techniques.length > 3 && (
                        <span className="technique-tag">
                          +{walkthrough.techniques.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No walkthroughs found matching your criteria.</p>
        )}
      </section>
    </div>
  );
};

export default HTBList;
