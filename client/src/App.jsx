import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useCart } from "./context/CartContext";
import BookList from "./components/BookList";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const { cartItems } = useCart();
  const { user, logout } = useAuth()
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <BrowserRouter>
      <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <Link to="/" className="font-bold text-lg">Online Bookstore</Link>
        <div className="space-x-4">
          {user ? (
            <>
              <span className="font-bold">Hello, {user.name.split(' ')[0]}</span>
              <button onClick={logout} className="hover:underline">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
          <Link to="/orders" className="hover:underline">Orders</Link>
          <Link to="/cart" className="relative hover:underline">
            Cart
            {totalQuantity > 0 && (
              <span className="ml-1 bg-red-500 text-white rounded-full px-2 py-0.5 text-xs transition-transform duration-200 transform hover:scale-110">
                {totalQuantity}
              </span>
            )}
          </Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
