import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Wishlist.css";

function Wishlist() {

    const navigate = useNavigate();

    const [wishlistItems, setWishlistItems] = useState([
        {
            id: 1,
            name: "Computer Science Textbook",
            category: "Textbooks",
            price: 350,
            image: "📚",
            rating: 5
        },
        {
            id: 2,
            name: "Student Laptop",
            category: "Electronics",
            price: 4500,
            image: "💻",
            rating: 5
        },
        {
            id: 3,
            name: "Scientific Calculator",
            category: "Calculators",
            price: 250,
            image: "🧮",
            rating: 4
        }
    ]);


    // Remove product from wishlist
    function removeFromWishlist(id) {

        setWishlistItems(
            wishlistItems.filter(
                (item) => item.id !== id
            )
        );

    }


    // Add product to cart
    function addToCart(item) {

        alert(`${item.name} added to cart`);

    }


    return (

        <div className="wishlist-page">

            <Navbar />


            {/* PAGE HEADER */}

            <section className="wishlist-header">

                <h1>
                    My Wishlist
                </h1>

                <p>
                    Save your favourite study products for later.
                </p>

            </section>


            {/* WISHLIST */}

            <main className="wishlist-container">

                <div className="wishlist-top">

                    <h2>
                        Saved Items
                    </h2>

                    <span>
                        {wishlistItems.length} items
                    </span>

                </div>


                {wishlistItems.length > 0 ? (

                    <div className="wishlist-grid">

                        {wishlistItems.map((item) => (

                            <div
                                className="wishlist-card"
                                key={item.id}
                            >

                                {/* REMOVE BUTTON */}

                                <button
                                    className="wishlist-remove"
                                    onClick={() =>
                                        removeFromWishlist(item.id)
                                    }
                                >
                                    ♥
                                </button>


                                {/* IMAGE */}

                                <div
                                    className="wishlist-image"
                                    onClick={() =>
                                        navigate(
                                            `/products/${item.id}`
                                        )
                                    }
                                >
                                    {item.image}
                                </div>


                                {/* DETAILS */}

                                <div className="wishlist-details">

                                    <span className="wishlist-category">
                                        {item.category}
                                    </span>

                                    <h3>
                                        {item.name}
                                    </h3>


                                    {/* RATING */}

                                    <div className="wishlist-rating">

                                        {"⭐".repeat(item.rating)}

                                    </div>


                                    {/* PRICE */}

                                    <p className="wishlist-price">

                                        R
                                        {item.price.toLocaleString()}

                                    </p>


                                    {/* BUTTON */}

                                    <button
                                        className="wishlist-cart-button"
                                        onClick={() =>
                                            addToCart(item)
                                        }
                                    >
                                        Add to Cart
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                ) : (

                    /* EMPTY WISHLIST */

                    <div className="empty-wishlist">

                        <div className="empty-wishlist-icon">
                            ♡
                        </div>

                        <h2>
                            Your Wishlist is Empty
                        </h2>

                        <p>
                            Save products you love and
                            find them here later.
                        </p>

                        <button
                            onClick={() =>
                                navigate("/products")
                            }
                        >
                            Browse Products
                        </button>

                    </div>

                )}


                {/* CONTINUE SHOPPING */}

                {wishlistItems.length > 0 && (

                    <button
                        className="wishlist-shopping"
                        onClick={() =>
                            navigate("/products")
                        }
                    >
                        ← Continue Shopping
                    </button>

                )}

            </main>


            {/* FOOTER */}

            <footer className="wishlist-footer">

                <p>
                    © 2026 StudyHub. All rights reserved.
                </p>

            </footer>

        </div>
    );
}

export default Wishlist;