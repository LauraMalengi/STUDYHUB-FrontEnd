import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./components/LandingPage/LandingPage";
import LogIn from "./components/LogIn/LogIn";
import SignUp from "./components/SignUp/SignUp";
import Home from "./components/Home/Home";
import Products from "./components/Products/Products";
import ProductDetails from "./components/ProductCard/ProductDetails";
import Orders from "./components/Orders/Orders";
import Cart from "./components/Carts/Cart"
import Wishlist from "./components/Wishlist/Wishlist";
import Checkout from "./components/Checkout/Checkout"
import Profile from "./components/Profile/Profile";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* Public routes */}

                <Route
                    path="/"
                    element={<LandingPage />}
                />

                <Route
                    path="/signin"
                    element={<LogIn />}
                />

                <Route
                    path="/signup"
                    element={<SignUp />}
                />

                <Route path="/about"
                 element={<About />} />

                <Route path="/contact" 
                element={<Contact />} />


                {/* Protected routes */}

                <Route
                    path="/home"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/products"
                    element={
                        <ProtectedRoute>
                            <Products />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/cart"
                    element={
                        <ProtectedRoute>
                            <Cart />
                        </ProtectedRoute>
                    }
                />

                <Route
    path="/profile"
    element={
        <ProtectedRoute>
            <Profile />
        </ProtectedRoute>
    }
/>

                <Route
                    path="/wishlist"
                    element={
                        <ProtectedRoute>
                            <Wishlist />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/checkout"
                    element={
                        <ProtectedRoute>
                            <Checkout />
                        </ProtectedRoute>
                    }
                />

                 <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/orders"
                    element={
                        <ProtectedRoute>
                            <Orders />
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;