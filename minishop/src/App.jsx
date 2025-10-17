import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Cart from "./pages/Cart";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        
      </Routes>
    </Router>
  );
}

export default App;  



