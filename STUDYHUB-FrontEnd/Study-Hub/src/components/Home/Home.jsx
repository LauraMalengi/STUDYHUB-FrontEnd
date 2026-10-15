import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Home.css";

function Home() {
    return (
        <div className="home-page">

            <Navbar />

            <section className="home-hero">

                <div className="hero-content">

                    <h1>
                        Welcome to StudyHub
                    </h1>

                    <p>
                        Your student marketplace for affordable
                        academic resources and study essentials.
                    </p>

                    <div className="hero-buttons">

                        <button className="shop-btn">
                            Shop Now
                        </button>

                        <button className="sell-btn">
                            Start Selling
                        </button>

                    </div>

                </div>

            </section>

            <section className="categories-section">

                <h2>
                    Explore Categories
                </h2>

                <div className="category-container">

                    <div className="category-card">
                        <div className="category-icon">
                            📚
                        </div>

                        <h3>Textbooks</h3>

                        <p>
                            Find affordable textbooks
                            for your courses.
                        </p>
                    </div>


                    <div className="category-card">
                        <div className="category-icon">
                            💻
                        </div>

                        <h3>Laptops</h3>

                        <p>
                            Browse affordable laptops
                            and study devices.
                        </p>
                    </div>


                    <div className="category-card">
                        <div className="category-icon">
                            🧮
                        </div>

                        <h3>Calculators</h3>

                        <p>
                            Find calculators and
                            academic equipment.
                        </p>
                    </div>


                    <div className="category-card">
                        <div className="category-icon">
                            🎒
                        </div>

                        <h3>Stationery</h3>

                        <p>
                            Get everything you need
                            for your studies.
                        </p>
                    </div>

                </div>

            </section>


            {/* FEATURED PRODUCTS */}
            <section className="featured-section">

                <div className="section-heading">

                    <div>
                        <h2>
                            Featured Products
                        </h2>

                        <p>
                            Popular products from our student marketplace.
                        </p>
                    </div>

                    <button className="view-all-btn">
                        View All
                    </button>

                </div>


                <div className="products-container">

                    <div className="product-card">

                        <div className="product-image">
                            📚
                        </div>

                        <div className="product-info">

                            <h3>
                                Computer Science Textbook
                            </h3>

                            <p className="product-category">
                                Textbooks
                            </p>

                            <div className="product-bottom">

                                <span className="price">
                                    R350
                                </span>

                                <button>
                                    Add to Cart
                                </button>

                            </div>

                        </div>

                    </div>


                    <div className="product-card">

                        <div className="product-image">
                            💻
                        </div>

                        <div className="product-info">

                            <h3>
                                Student Laptop
                            </h3>

                            <p className="product-category">
                                Electronics
                            </p>

                            <div className="product-bottom">

                                <span className="price">
                                    R4,500
                                </span>

                                <button>
                                    Add to Cart
                                </button>

                            </div>

                        </div>

                    </div>


                    <div className="product-card">

                        <div className="product-image">
                            🧮
                        </div>

                        <div className="product-info">

                            <h3>
                                Scientific Calculator
                            </h3>

                            <p className="product-category">
                                Calculators
                            </p>

                            <div className="product-bottom">

                                <span className="price">
                                    R250
                                </span>

                                <button>
                                    Add to Cart
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            <section className="why-section">

                <h2>
                    Why Choose StudyHub?
                </h2>

                <div className="why-container">

                    <div className="why-card">

                        <h3>
                            Affordable
                        </h3>

                        <p>
                            Find academic resources at
                            student-friendly prices.
                        </p>

                    </div>


                    <div className="why-card">

                        <h3>
                            Trusted Sellers
                        </h3>

                        <p>
                            Buy from verified students
                            and trusted sellers.
                        </p>

                    </div>


                    <div className="why-card">

                        <h3>
                            Secure Shopping
                        </h3>

                        <p>
                            Shop with confidence using
                            secure payment options.
                        </p>

                    </div>

                </div>

            </section>

            <footer className="home-footer">

                <p>
                    © 2026 StudyHub. All rights reserved.
                </p>

            </footer>

        </div>
    );
}

export default Home;