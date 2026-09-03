import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {

    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem("token");
        navigate("/signin");
    }

    return (
        <nav className="navbar">

            <div className="navbar-logo">
                <Link to="/home">
                    StudyHub
                </Link>
            </div>

            <div className="navbar-links">

                <Link to="/home">
                    Home
                </Link>

                <Link to="/products">
                    Products
                </Link>

                <Link to="/wishlist">
                    Wishlist
                </Link>

                <Link to="/cart">
                    Cart
                </Link>

                <Link to="/Orders">
                    Orders
                </Link>

                <Link to="/Profile">
                    Profile
                </Link>

                <Link to="/About">
                    About
                </Link>

                <Link to="/contact">
                    Contact
                </Link>

            </div>

            <button
                className="logout-button"
                onClick={handleLogout}
            >
                Logout
            </button>

        </nav>
    );
}

export default Navbar;