import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Cart.css";

function Cart() {

    const navigate = useNavigate();

    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: "Computer Science Textbook",
            category: "Textbooks",
            price: 350,
            quantity: 1,
            image: "📚"
        },
        {
            id: 2,
            name: "Scientific Calculator",
            category: "Calculators",
            price: 250,
            quantity: 2,
            image: "🧮"
        }
    ]);


    // Increase quantity
    function increaseQuantity(id) {

        setCartItems(
            cartItems.map((item) => {

                if (item.id === id) {

                    return {
                        ...item,
                        quantity: item.quantity + 1
                    };

                }

                return item;

            })
        );

    }


    // Decrease quantity
    function decreaseQuantity(id) {

        setCartItems(
            cartItems.map((item) => {

                if (item.id === id && item.quantity > 1) {

                    return {
                        ...item,
                        quantity: item.quantity - 1
                    };

                }

                return item;

            })
        );

    }


    // Remove item
    function removeItem(id) {

        setCartItems(
            cartItems.filter(
                (item) => item.id !== id
            )
        );

    }


    // Calculate subtotal
    const subtotal = cartItems.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );


    // Delivery
    const delivery = subtotal > 0 ? 60 : 0;


    // Total
    const total = subtotal + delivery;


    return (

        <div className="cart-page">

            <Navbar />


            {/* PAGE HEADER */}

            <section className="cart-header">

                <h1>
                    Shopping Cart
                </h1>

                <p>
                    Review your items before checkout.
                </p>

            </section>


            {/* CART */}

            <main className="cart-container">


                {/* LEFT SIDE */}

                <div className="cart-items-section">

                    <div className="cart-title">

                        <h2>
                            Your Cart
                        </h2>

                        <span>
                            {cartItems.length} items
                        </span>

                    </div>


                    {cartItems.length > 0 ? (

                        cartItems.map((item) => (

                            <div
                                className="cart-item"
                                key={item.id}
                            >

                                {/* IMAGE */}

                                <div className="cart-item-image">
                                    {item.image}
                                </div>


                                {/* DETAILS */}

                                <div className="cart-item-details">

                                    <span className="cart-category">
                                        {item.category}
                                    </span>

                                    <h3>
                                        {item.name}
                                    </h3>

                                    <p>
                                        R{item.price.toLocaleString()}
                                    </p>

                                </div>


                                {/* QUANTITY */}

                                <div className="cart-quantity">

                                    <button
                                        onClick={() =>
                                            decreaseQuantity(item.id)
                                        }
                                    >
                                        −
                                    </button>

                                    <span>
                                        {item.quantity}
                                    </span>

                                    <button
                                        onClick={() =>
                                            increaseQuantity(item.id)
                                        }
                                    >
                                        +
                                    </button>

                                </div>


                                {/* ITEM TOTAL */}

                                <div className="cart-item-total">

                                    <strong>
                                        R
                                        {(
                                            item.price *
                                            item.quantity
                                        ).toLocaleString()}
                                    </strong>

                                </div>


                                {/* REMOVE */}

                                <button
                                    className="remove-button"
                                    onClick={() =>
                                        removeItem(item.id)
                                    }
                                >
                                    ×
                                </button>

                            </div>

                        ))

                    ) : (

                        <div className="empty-cart">

                            <div className="empty-cart-icon">
                                🛒
                            </div>

                            <h2>
                                Your cart is empty
                            </h2>

                            <p>
                                You haven't added any products yet.
                            </p>

                            <button
                                onClick={() =>
                                    navigate("/products")
                                }
                            >
                                Start Shopping
                            </button>

                        </div>

                    )}


                    {/* CONTINUE SHOPPING */}

                    {cartItems.length > 0 && (

                        <button
                            className="continue-shopping"
                            onClick={() =>
                                navigate("/products")
                            }
                        >
                            ← Continue Shopping
                        </button>

                    )}

                </div>


                {/* RIGHT SIDE */}

                {cartItems.length > 0 && (

                    <aside className="cart-summary">

                        <h2>
                            Order Summary
                        </h2>


                        <div className="summary-row">

                            <span>
                                Subtotal
                            </span>

                            <strong>
                                R{subtotal.toLocaleString()}
                            </strong>

                        </div>


                        <div className="summary-row">

                            <span>
                                Delivery
                            </span>

                            <strong>
                                R{delivery.toLocaleString()}
                            </strong>

                        </div>


                        <div className="summary-divider">
                        </div>


                        <div className="summary-total">

                            <span>
                                Total
                            </span>

                            <strong>
                                R{total.toLocaleString()}
                            </strong>

                        </div>


                        <button
                            className="checkout-button"
                            onClick={() =>
                                navigate("/checkout")
                            }
                        >
                            Proceed to Checkout
                        </button>


                        <div className="secure-message">

                            🔒 Secure checkout

                        </div>

                    </aside>

                )}

            </main>


            {/* FOOTER */}

            <footer className="cart-footer">

                <p>
                    © 2026 StudyHub. All rights reserved.
                </p>

            </footer>

        </div>
    );
}

export default Cart;