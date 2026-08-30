import { useEffect, useState } from "react";
import ProductDetails from "../ProductCard/ProductDetails";
import "./Products.css";
import "../Navbar/Navbar"
import Navbar from "../Navbar/Navbar";

function Products() {

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");

    const products = [
        {
            id: 1,
            name: "Computer Science Textbook",
            category: "Textbooks",
            price: 350,
            image: "📚"
        },
        {
            id: 2,
            name: "Student Laptop",
            category: "Electronics",
            price: 4500,
            image: "💻"
        },
        {
            id: 3,
            name: "Scientific Calculator",
            category: "Calculators",
            price: 250,
            image: "🧮"
        },
        {
            id: 4,
            name: "Programming Textbook",
            category: "Textbooks",
            price: 420,
            image: "📖"
        },
        {
            id: 5,
            name: "Wireless Keyboard",
            category: "Electronics",
            price: 350,
            image: "⌨️"
        },
        {
            id: 6,
            name: "Student Stationery Set",
            category: "Stationery",
            price: 180,
            image: "✏️"
        }
    ];

    const filteredProducts = products.filter((product) => {

        const matchesSearch =
            product.name
                .toLowerCase()
                .includes(search.toLowerCase());

        const matchesCategory =
            category === "All" ||
            product.category === category;

        return matchesSearch && matchesCategory;
    });

    return (
        <div className="products-page">

            <Navbar />

            {/* PAGE HEADER */}

            <section className="products-header">

                <h1>StudyHub Products</h1>

                <p>
                    Find affordable academic resources
                    and study essentials.
                </p>

            </section>


            {/* SEARCH AND FILTER */}

            <section className="products-controls">

                <div className="search-box">

                    <input
                        type="text"
                        placeholder="Search for a product..."
                        value={search}
                        onChange={(event) =>
                            setSearch(event.target.value)
                        }
                    />

                    <span>🔍</span>

                </div>


                <div className="category-buttons">

                    <button
                        className={
                            category === "All"
                                ? "active"
                                : ""
                        }
                        onClick={() => setCategory("All")}
                    >
                        All
                    </button>

                    <button
                        className={
                            category === "Textbooks"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            setCategory("Textbooks")
                        }
                    >
                        Textbooks
                    </button>

                    <button
                        className={
                            category === "Electronics"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            setCategory("Electronics")
                        }
                    >
                        Electronics
                    </button>

                    <button
                        className={
                            category === "Calculators"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            setCategory("Calculators")
                        }
                    >
                        Calculators
                    </button>

                    <button
                        className={
                            category === "Stationery"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            setCategory("Stationery")
                        }
                    >
                        Stationery
                    </button>

                </div>

            </section>


            {/* PRODUCT COUNT */}

            <div className="product-count">

                <p>
                    Showing{" "}
                    <strong>
                        {filteredProducts.length}
                    </strong>{" "}
                    products
                </p>

            </div>


            {/* PRODUCTS */}

            <section className="products-container">

                {filteredProducts.length > 0 ? (

                    filteredProducts.map((product) => (

                        <div
                            className="product-card"
                            key={product.id}
                        >

                            <div className="product-image">

                                <span>
                                    {product.image}
                                </span>

                                <button
                                    className="wishlist-button"
                                    type="button"
                                >
                                    ♡
                                </button>

                            </div>


                            <div className="product-info">

                                <p className="product-category">
                                    {product.category}
                                </p>

                                <h2>
                                    {product.name}
                                </h2>

                                <div className="product-rating">
                                    ⭐⭐⭐⭐⭐
                                </div>


                                <div className="product-bottom">

                                    <strong>
                                        R{product.price.toLocaleString()}
                                    </strong>

                                    <button
                                        className="cart-button"
                                        type="button"
                                    >
                                        Add to Cart
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))

                ) : (

                    <div className="no-products">

                        <h2>
                            No products found
                        </h2>

                        <p>
                            Try searching for something else.
                        </p>

                    </div>

                )}

            </section>


            {/* FOOTER */}

            <footer className="products-footer">

                <p>
                    © 2026 StudyHub. All rights reserved.
                </p>

            </footer>

        </div>
    );
}

export default Products;