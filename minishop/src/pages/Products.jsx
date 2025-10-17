import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Products() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const products = [
    { 
      id: 1, 
      name: "Premium Headphones", 
      price: 12999, 
      category: "Audio",
      image: "🎧",
      description: "Noise cancelling wireless headphones",
      rating: 4.8,
      features: ["Wireless", "Noise Cancelling"]
    },
    { 
      id: 2, 
      name: "Luxury Smartwatch", 
      price: 25999, 
      category: "Wearables",
      image: "⌚",
      description: "Advanced smartwatch with health monitoring",
      rating: 4.6,
      features: ["Health Monitor", "Waterproof"]
    },
    { 
      id: 3, 
      name: "Mechanical Keyboard", 
      price: 8999, 
      category: "Accessories",
      image: "⌨️",
      description: "RGB mechanical keyboard",
      rating: 4.5,
      features: ["RGB Lighting", "Mechanical"]
    },
    { 
      id: 4, 
      name: "Wireless Mouse", 
      price: 3499, 
      category: "Accessories",
      image: "🖱️",
      description: "Ergonomic wireless mouse",
      rating: 4.3,
      features: ["Ergonomic", "Precision"]
    },
    { 
      id: 5, 
      name: "Bluetooth Speaker", 
      price: 12999, 
      category: "Audio",
      image: "🔊",
      description: "Portable speaker with 360° sound",
      rating: 4.7,
      features: ["360° Sound", "Waterproof"]
    },
    { 
      id: 6, 
      name: "Gaming Monitor", 
      price: 34999, 
      category: "Electronics",
      image: "🖥️",
      description: "4K gaming monitor 144Hz",
      rating: 4.9,
      features: ["4K Display", "144Hz"]
    },
    { 
      id: 7, 
      name: "Wireless Earbuds", 
      price: 15999, 
      category: "Audio",
      image: "🎵",
      description: "True wireless earbuds",
      rating: 4.4,
      features: ["True Wireless", "Noise Cancelling"]
    },
    { 
      id: 8, 
      name: "Tablet Pro", 
      price: 45999, 
      category: "Electronics",
      image: "📱",
      description: "Professional tablet with stylus",
      rating: 4.8,
      features: ["Stylus Support", "High-Res"]
    }
  ];

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (!loggedIn) navigate("/login");

    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
    
    setTimeout(() => setIsLoading(false), 1000);
  }, [navigate]);

  const addToCart = (product) => {
    const updatedCart = [...cart];
    const existing = updatedCart.find((item) => item.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    
    const button = document.getElementById(`add-btn-${product.id}`);
    if (button) {
      button.textContent = "✓ Added!";
      button.classList.add("bg-green-500");
      setTimeout(() => {
        button.textContent = "Add to Cart";
        button.classList.remove("bg-green-500");
      }, 2000);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const filteredProducts = products
    .filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "price") return a.price - b.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return a.name.localeCompare(b.name);
    });

  const categories = [...new Set(products.map(product => product.category))];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading luxury products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100">
      {/* Enhanced Mobile-Friendly Navbar */}
      <nav className="bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            {/* Logo - Smaller on mobile */}
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm sm:text-lg">M</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold">Mini Shop</h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden sm:flex items-center space-x-3">
              <button
                onClick={() => navigate("/cart")}
                className="relative bg-white/20 px-3 py-2 rounded-lg font-semibold hover:bg-white/30 transform hover:scale-105 transition-all duration-200 flex items-center space-x-2 text-sm"
              >
                <span>🛒</span>
                <span>Cart</span>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                    {totalItems}
                  </span>
                )}
              </button>
              
              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-2 rounded-lg hover:bg-red-600 transform hover:scale-105 transition-all duration-200 shadow-lg text-sm"
              >
                Logout
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="sm:hidden flex items-center space-x-2">
              {/* Cart Icon Only on Mobile */}
              <button
                onClick={() => navigate("/cart")}
                className="relative p-2 bg-white/20 rounded-lg"
              >
                <span>🛒</span>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold">
                    {totalItems}
                  </span>
                )}
              </button>
              
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 bg-white/20 rounded-lg"
              >
                <span className="text-lg">☰</span>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="sm:hidden bg-white/10 backdrop-blur-lg border-t border-white/20 py-3">
              <div className="flex flex-col space-y-3 px-3">
                <button
                  onClick={() => {
                    navigate("/cart");
                    setIsMenuOpen(false);
                  }}
                  className="bg-white/20 py-2 rounded-lg font-semibold text-center"
                >
                  View Cart ({totalItems})
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="bg-red-500 py-2 rounded-lg text-center"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section - Mobile Optimized */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-8 sm:py-16">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 px-2">
            Premium Products
          </h1>
          <p className="text-sm sm:text-xl opacity-90 mb-6 sm:mb-8 px-2">
            Discover luxury electronics and accessories
          </p>
          
          {/* Search and Filter - Stacked on Mobile */}
          <div className="max-w-4xl mx-auto grid grid-cols-1 gap-3 sm:gap-4 px-2">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 sm:px-6 sm:py-3 rounded-xl text-white focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-purple-300 text-sm sm:text-base"
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-3 rounded-xl text-gray-800 focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-purple-300 text-sm sm:text-base"
            >
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
              <option value="rating">Sort by Rating</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid - Mobile Optimized */}
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-6 sm:py-12">
        {/* Results Info - Stacked on Mobile */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
          <p className="text-gray-600 text-sm sm:text-base text-center sm:text-left">
            Showing {filteredProducts.length} of {products.length} products
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSearchTerm(category)}
                className="bg-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg border border-gray-300 hover:border-purple-500 transition-colors duration-200 text-xs sm:text-sm"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid - 1 column on mobile, 2 on small, 3 on medium, 4 on large */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white/80 backdrop-blur-lg rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 overflow-hidden group"
            >
              {/* Product Image - Smaller on mobile */}
              <div className="h-32 sm:h-48 bg-gradient-to-br from-purple-200 to-blue-200 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <span className="text-4xl sm:text-6xl">{product.image}</span>
              </div>

              {/* Product Info - Compact on mobile */}
              <div className="p-3 sm:p-4 lg:p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 truncate flex-1 mr-2">
                    {product.name}
                  </h3>
                  <span className="flex items-center space-x-1 bg-yellow-100 text-yellow-800 px-1 sm:px-2 py-1 rounded-full text-xs">
                    <span>⭐</span>
                    <span className="hidden xs:inline">{product.rating}</span>
                  </span>
                </div>
                
                <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
                  {product.description}
                </p>
                
                {/* Features - Hidden on extra small screens */}
                <div className="hidden xs:flex flex-wrap gap-1 mb-3 sm:mb-4">
                  {product.features.slice(0, 2).map((feature, index) => (
                    <span key={index} className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Price and Action - Stacked on mobile */}
                <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-2">
                  <div className="flex xs:flex-col gap-1">
                    <p className="text-lg sm:text-xl lg:text-2xl font-bold text-purple-600">
                      ₹{product.price.toLocaleString()}
                    </p>
                    <p className="text-green-600 text-xs font-semibold">In Stock ✓</p>
                  </div>
                  <button
                    id={`add-btn-${product.id}`}
                    onClick={() => addToCart(product)}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 shadow-md text-sm sm:text-base w-full xs:w-auto"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State - Mobile Optimized */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12 sm:py-16 px-4">
            <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-r from-purple-200 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <span className="text-2xl sm:text-4xl">🔍</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">No products found</h3>
            <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">Try adjusting your search criteria</p>
            <button
              onClick={() => setSearchTerm("")}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-sm sm:text-base"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 flex justify-around items-center shadow-lg">
        <button
          onClick={() => navigate("/products")}
          className="flex flex-col items-center text-purple-600"
        >
          <span className="text-lg">🏠</span>
          <span className="text-xs mt-1">Home</span>
        </button>
        <button
          onClick={() => navigate("/cart")}
          className="flex flex-col items-center text-gray-600 relative"
        >
          <span className="text-lg">🛒</span>
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold">
              {totalItems}
            </span>
          )}
          <span className="text-xs mt-1">Cart</span>
        </button>
        <button
          onClick={handleLogout}
          className="flex flex-col items-center text-gray-600"
        >
          <span className="text-lg">🚪</span>
          <span className="text-xs mt-1">Logout</span>
        </button>
      </div>

      {/* Add padding for bottom navigation */}
      <div className="sm:hidden h-16"></div>
    </div>
  );
}

export default Products;