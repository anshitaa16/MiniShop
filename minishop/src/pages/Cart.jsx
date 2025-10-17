import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (!loggedIn) navigate("/login");

    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
    setIsLoading(false);
  }, [navigate]);

  const updateCart = (updated) => {
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const increaseQty = (id) => {
    const updated = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(updated);
  };

  const decreaseQty = (id) => {
    const updated = cart
      .map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      )
      .filter((item) => item.quantity > 0);
    updateCart(updated);
  };

  const removeItem = (id) => {
    const updated = cart.filter((item) => item.id !== id);
    updateCart(updated);
  };

  const clearCart = () => {
    setCart([]);
    localStorage.setItem("cart", JSON.stringify([]));
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  const handleCheckout = () => {
    setIsLoading(true);
    setTimeout(() => {
      alert("Order placed successfully! 🎉");
      clearCart();
      setIsLoading(false);
    }, 1500);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100">
      {/* Mobile-Optimized Navbar */}
      <nav className="bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            {/* Logo - Smaller on mobile */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm sm:text-lg">M</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold">Mini Shop</h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden sm:flex items-center space-x-3">
              <div className="flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full">
                <span className="text-sm">🛒</span>
                <span className="text-sm font-semibold">{totalItems} items</span>
              </div>
              
              <button
                onClick={() => navigate("/products")}
                className="bg-white text-purple-600 px-3 py-2 rounded-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg text-sm"
              >
                Continue Shopping
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
              {/* Cart Badge */}
              <div className="relative">
                <span className="text-lg">🛒</span>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                    {totalItems}
                  </span>
                )}
              </div>
              
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
                    navigate("/products");
                    setIsMenuOpen(false);
                  }}
                  className="bg-white/20 py-2 rounded-lg font-semibold text-center"
                >
                  Continue Shopping
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

      {/* Cart Section - Mobile Optimized */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6 lg:mb-8 px-2">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
            Your Shopping Cart
          </h2>
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
            Review and manage your luxury items
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="text-center bg-white/80 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 lg:p-12 max-w-2xl mx-auto">
            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-r from-purple-200 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <span className="text-2xl sm:text-3xl lg:text-4xl">🛒</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
              Your cart is empty
            </h3>
            <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
              Discover our exclusive collection and add some premium products!
            </p>
            <button
              onClick={() => navigate("/products")}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 sm:px-8 sm:py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-sm sm:text-base w-full sm:w-auto"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Cart Items - Full width on mobile */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white/80 backdrop-blur-lg rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 p-4 sm:p-6"
                >
                  <div className="flex flex-col xs:flex-row items-start gap-4">
                    {/* Product Image */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-200 to-blue-200 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-xl sm:text-2xl">🛍️</span>
                    </div>
                    
                    {/* Product Info */}
                    <div className="flex-1 min-w-0 w-full">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
                          {item.name}
                        </h3>
                        <p className="text-xl sm:text-2xl font-bold text-purple-600">
                          ₹{item.price.toLocaleString()}
                        </p>
                      </div>
                      <p className="text-gray-500 text-xs sm:text-sm mb-4">
                        Luxury Collection
                      </p>

                      {/* Quantity Controls - Stacked on mobile */}
                      <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3">
                        <div className="flex items-center space-x-3 bg-gray-100 rounded-lg sm:rounded-xl px-3 py-2 w-fit">
                          <button
                            onClick={() => decreaseQty(item.id)}
                            className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-md sm:rounded-lg shadow flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 text-gray-600 hover:text-purple-600 text-sm sm:text-base"
                          >
                            <span className="font-bold">-</span>
                          </button>
                          <span className="text-base sm:text-lg font-bold text-gray-800 min-w-6 sm:min-w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => increaseQty(item.id)}
                            className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-md sm:rounded-lg shadow flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 text-gray-600 hover:text-purple-600 text-sm sm:text-base"
                          >
                            <span className="font-bold">+</span>
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="w-full xs:w-auto bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transform hover:scale-105 transition-all duration-200 shadow text-sm sm:text-base flex items-center justify-center space-x-2"
                        >
                          <span>×</span>
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Item Total */}
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                    <span className="text-gray-600 text-sm sm:text-base">Item Total</span>
                    <span className="text-lg sm:text-xl font-bold text-gray-900">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary - Full width on mobile, sticky on desktop */}
            <div className="lg:col-span-1">
              <div className="bg-white/80 backdrop-blur-lg rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-6 lg:sticky lg:top-4 border border-white/20">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                  Order Summary
                </h3>
                
                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm sm:text-base">Items ({totalItems})</span>
                    <span className="font-semibold text-sm sm:text-base">₹{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm sm:text-base">Shipping</span>
                    <span className="font-semibold text-green-600 text-sm sm:text-base">FREE</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm sm:text-base">Tax</span>
                    <span className="font-semibold text-sm sm:text-base">₹{(totalPrice * 0.18).toLocaleString()}</span>
                  </div>
                  <div className="border-t border-gray-300 pt-3 sm:pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg sm:text-xl font-bold text-gray-900">Total</span>
                      <span className="text-xl sm:text-2xl font-bold text-purple-600">
                        ₹{(totalPrice * 1.18).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handleCheckout}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base lg:text-lg hover:shadow-lg sm:hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md sm:shadow-lg"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Processing...
                      </div>
                    ) : (
                      'Proceed to Checkout'
                    )}
                  </button>
                  
                  <button
                    onClick={clearCart}
                    className="w-full bg-gray-100 text-gray-700 py-2 sm:py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-200 border border-gray-300 text-sm sm:text-base"
                  >
                    Clear Cart
                  </button>
                </div>

                {/* Security Badge */}
                <div className="mt-4 sm:mt-6 text-center">
                  <div className="flex items-center justify-center space-x-2 text-green-600 mb-2">
                    <span className="text-sm">🔒</span>
                    <span className="text-xs sm:text-sm font-semibold">Secure Checkout</span>
                  </div>
                  <p className="text-xs text-gray-500">Your payment information is encrypted and secure</p>
                </div>
              </div>
            </div>
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
          <span className="text-xs mt-1">Shop</span>
        </button>
        <button
          onClick={() => navigate("/cart")}
          className="flex flex-col items-center text-purple-600 relative"
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

export default Cart;