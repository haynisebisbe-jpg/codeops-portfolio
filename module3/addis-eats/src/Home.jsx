function Home() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="home-hero">
        <div className="home-hero-content">
          <p className="home-eyebrow">AUTHENTIC HABESHA FLAVORS</p>

          <h2>Welcome to Addis Eats</h2>

          <p className="home-hero-text">
            Discover rich Ethiopian flavors, traditional favorites,
            and delicious meals delivered across Addis Ababa.
          </p>

          <a href="/menu" className="home-cta">
            Explore Our Menu
          </a>
        </div>

        <div className="home-hero-decoration">
          <div className="mesob-circle">
            <span>🍽️</span>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="home-section">
        <div className="home-section-heading">
          <p className="home-eyebrow">EXPLORE</p>

          <h2>Something for Every Taste</h2>

          <p>
            From traditional wat and tibs to refreshing drinks,
            find your favorite Ethiopian dishes.
          </p>
        </div>

        <div className="home-categories">
          <a href="/menu?category=Traditional%20Stews%20%26%20Wat">
            <span>🍲</span>
            <h3>Traditional Stews</h3>
            <p>Rich, flavorful Ethiopian classics.</p>
          </a>

          <a href="/menu?category=Tibs%20%26%20Grills">
            <span>🔥</span>
            <h3>Tibs & Grills</h3>
            <p>Sizzling grilled favorites.</p>
          </a>

          <a href="/menu?category=Fasting%20%26%20Vegan%20%2F%20Tsom">
            <span>🌿</span>
            <h3>Fasting & Vegan</h3>
            <p>Delicious plant-based choices.</p>
          </a>

          <a href="/menu?category=Beverages%20%26%20Tej">
            <span>☕</span>
            <h3>Beverages</h3>
            <p>Traditional drinks and coffee.</p>
          </a>
        </div>
      </section>

      {/* Brand Story */}
      <section className="home-story">
        <div>
          <p className="home-eyebrow">THE ADDIS EATS EXPERIENCE</p>

          <h2>Good Food. Warm Hospitality.</h2>

          <p>
            Addis Eats brings the flavors and hospitality of Ethiopian
            dining to a modern ordering experience. Browse the menu,
            choose your favorites, and enjoy great food across Addis.
          </p>

          <a href="/menu" className="home-secondary-cta">
            View Full Menu
          </a>
        </div>

        <div className="home-story-card">
          <span>☕</span>
          <h3>Made for Addis</h3>
          <p>
            Inspired by traditional Ethiopian food and the warmth
            of communal dining.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;