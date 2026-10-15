import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/Logos/main-logo.png";

function Navbar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">

      {/* Logo */}
      <Link to="/home" className="navbar-brand">
        <img
          src={logo}
          alt="StudyHub"
          className="navbar-logo"
        />
      </Link>


      {/* Navigation */}
      <div className="navbar-links">

        <Link
          to="/home"
          className={isActive("/home") ? "nav-link active" : "nav-link"}
        >
          Home
        </Link>

        <Link
          to="/products"
          className={isActive("/products") ? "nav-link active" : "nav-link"}
        >
          Products
        </Link>

        <Link
          to="/wishlist"
          className={isActive("/wishlist") ? "nav-link active" : "nav-link"}
        >
          Wishlist
        </Link>

        <Link
          to="/cart"
          className={isActive("/cart") ? "nav-link active" : "nav-link"}
        >
          Cart
        </Link>

        <Link
          to="/orders"
          className={isActive("/orders") ? "nav-link active" : "nav-link"}
        >
          Orders
        </Link>

        <Link
          to="/profile"
          className={isActive("/profile") ? "nav-link active" : "nav-link"}
        >
          Profile
        </Link>

        <Link
          to="/about"
          className={isActive("/about") ? "nav-link active" : "nav-link"}
        >
          About
        </Link>

        <Link
          to="/contact"
          className={isActive("/contact") ? "nav-link active" : "nav-link"}
        >
          Contact
        </Link>

      </div>


      {/* Logout */}
      <button className="logout-button">
        Logout
      </button>

    </nav>
  );
}

export default Navbar;