import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./ProductDetails.css";

function ProductDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [quantity, setQuantity] = useState(1);

    const products = [
        {
            id: "1",
            name: "Computer Science Textbook",
            category: "Textbooks",
            price: 350,
            image: "📚",
            rating: 5,
            description:
                "A useful computer science textbook for students studying programming, software development and information technology.",
            seller: "StudyHub Seller"
        },
        {
            id: "2",
            name: "Student Laptop",
            category: "Electronics",
            price: 4500,
            image: "💻",
            rating: 5,
            description:
                "A practical laptop suitable for students working on assignments, programming projects and online learning.",
            seller: "StudyHub Seller"
        },
        {
            id: "3",
            name: "Scientific Calculator",
            category: "Calculators",
            price: 250,
            image: "🧮",
            rating: 4,
            description:
                "A scientific calculator suitable for mathematics, science and other academic subjects.",
            seller: "StudyHub Seller"
        },
        {
            id: "4",
            name: "Programming Textbook",
            category: "Textbooks",
            price: 420,
            image: "📖",
            rating: 5,
            description:
                "A programming textbook designed to help students understand programming concepts and problem solving.",
            seller: "StudyHub Seller"
        },
        {
            id: "5",
            name: "Wireless Keyboard",
            category: "Electronics",
            price: 350,
            image: "⌨️",
            rating: 4,
            description:
                "A wireless keyboard that is useful for students who need a comfortable setup for studying and coding.",
            seller: "StudyHub Seller"
        },
        {
            id: "6",
            name: "Student Stationery Set",
            category: "Stationery",
            price: 180,
            image: "✏️",
            rating: 5,
            description:
                "A stationery set containing useful items for everyday student work and assignments.",
            seller: "StudyHub Seller"
        }
    ];

    const product = products.find(
        (item) => item.id === id
    );

    if (!product) {

        return (
            <div className="product-details-page">

                <Navbar />

                <div className="product-not-found">

                    <h1>Product Not Found</h1>

                    <p>
                        We could not find the product you are looking for.
                    </p>

                    <button
                        onClick={() => navigate("/products")}
                    >
                        Back to Products
                    </button>

                </div>

            </div>
        );
    }


    function increaseQuantity() {
        setQuantity(quantity + 1);
    }


    function decreaseQuantity() {

        if (quantity > 1) {
            setQuantity(quantity - 1);
        }

    }


    function handleAddToCart() {

        alert(
            `${quantity} ${product.name} added to cart`
        );

    }


    return (

        <div className="product-details-page">

            <Navbar />


            {/* BREADCRUMB */}

            <div className="breadcrumb">

                <button
                    onClick={() => navigate("/products")}
                >
                    Products
                </button>

                <span> / </span>

                <span>{product.name}</span>

            </div>


            {/* PRODUCT DETAILS */}

            <main className="product-details-container">


                {/* IMAGE */}

                <div className="details-image">

                    <div className="large-product-image">
                        {product.image}
                    </div>

                </div>


                {/* INFORMATION */}

                <div className="details-information">

                    <span className="details-category">
                        {product.category}
                    </span>


                    <h1>
                        {product.name}
                    </h1>


                    <div className="details-rating">

                        <span>
                            {"⭐".repeat(product.rating)}
                        </span>

                        <span className="rating-text">
                            {product.rating}.0 / 5
                        </span>

                    </div>


                    <h2 className="details-price">
                        R{product.price.toLocaleString()}
                    </h2>


                    <p className="details-description">
                        {product.description}
                    </p>


                    <div className="seller">

                        <strong>
                            Seller
                        </strong>

                        <p>
                            {product.seller}
                        </p>

                    </div>


                    {/* QUANTITY */}

                    <div className="quantity-section">

                        <strong>
                            Quantity
                        </strong>

                        <div className="quantity-controls">

                            <button
                                onClick={decreaseQuantity}
                            >
                                −
                            </button>

                            <span>
                                {quantity}
                            </span>

                            <button
                                onClick={increaseQuantity}
                            >
                                +
                            </button>

                        </div>

                    </div>


                    {/* ACTIONS */}

                    <div className="details-actions">

                        <button
                            className="add-cart-button"
                            onClick={handleAddToCart}
                        >
                            Add to Cart
                        </button>


                        <button
                            className="buy-button"
                            onClick={() => alert("Checkout coming soon")}
                        >
                            Buy Now
                        </button>

                    </div>

                </div>

            </main>


            {/* DESCRIPTION SECTION */}

            <section className="product-description-section">

                <h2>
                    Product Information
                </h2>

                <p>
                    {product.description}
                </p>

                <div className="product-features">

                    <div>
                        <strong>Category</strong>
                        <span>{product.category}</span>
                    </div>

                    <div>
                        <strong>Seller</strong>
                        <span>{product.seller}</span>
                    </div>

                    <div>
                        <strong>Rating</strong>
                        <span>{product.rating} / 5</span>
                    </div>

                </div>

            </section>


            {/* FOOTER */}

            <footer className="product-details-footer">

                <p>
                    © 2026 StudyHub. All rights reserved.
                </p>

            </footer>

        </div>
    );
}

export default ProductDetails;