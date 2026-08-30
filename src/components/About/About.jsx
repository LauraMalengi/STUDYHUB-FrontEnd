import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./About.css";

function About() {

    const navigate = useNavigate();

    return (

        <div className="about-page">

            <Navbar />

            {/* HERO SECTION */}

            <section className="about-hero">

                <div className="about-hero-content">

                    <span className="about-tag">
                        ABOUT STUDYHUB
                    </span>

                    <h1>
                        Making Student Life
                        <br />
                        <span>Simple & Affordable</span>
                    </h1>

                    <p>
                        StudyHub is a student-focused online marketplace
                        designed to make it easier to find affordable
                        study products, textbooks, stationery and
                        educational resources.
                    </p>

                    <button
                        onClick={() => navigate("/products")}
                    >
                        Explore Products
                    </button>

                </div>

            </section>


            {/* INTRODUCTION */}

            <section className="about-introduction">

                <div className="about-image">

                    <div className="about-image-icon">
                        🎓
                    </div>

                </div>


                <div className="about-text">

                    <span className="section-label">
                        WHO WE ARE
                    </span>

                    <h2>
                        Built With Students
                        <br />
                        In Mind
                    </h2>

                    <p>
                        StudyHub was created to help students find the
                        resources they need for their academic journey
                        without making the process complicated.
                    </p>

                    <p>
                        From textbooks and stationery to calculators
                        and technology, StudyHub brings useful student
                        products together in one convenient platform.
                    </p>

                    <p>
                        Our goal is to create a trusted marketplace
                        where students can discover products, compare
                        options and shop with confidence.
                    </p>

                </div>

            </section>


            {/* MISSION */}

            <section className="about-mission">

                <div className="mission-content">

                    <span className="section-label">
                        OUR MISSION
                    </span>

                    <h2>
                        Supporting Your
                        <br />
                        Academic Journey
                    </h2>

                    <p>
                        We want to make educational products more
                        accessible and convenient for students.
                        StudyHub connects buyers and sellers through
                        a simple online shopping experience.
                    </p>

                </div>

            </section>


            {/* VALUES */}

            <section className="about-values">

                <div className="values-heading">

                    <span className="section-label">
                        WHAT WE VALUE
                    </span>

                    <h2>
                        Why StudyHub?
                    </h2>

                </div>


                <div className="values-grid">


                    {/* VALUE 1 */}

                    <div className="value-card">

                        <div className="value-icon">
                            💰
                        </div>

                        <h3>
                            Affordable
                        </h3>

                        <p>
                            We focus on helping students find
                            useful products at prices that fit
                            their budgets.
                        </p>

                    </div>


                    {/* VALUE 2 */}

                    <div className="value-card">

                        <div className="value-icon">
                            🛡️
                        </div>

                        <h3>
                            Trusted
                        </h3>

                        <p>
                            We aim to provide students with a
                            reliable and secure shopping
                            experience.
                        </p>

                    </div>


                    {/* VALUE 3 */}

                    <div className="value-card">

                        <div className="value-icon">
                            🎓
                        </div>

                        <h3>
                            Student Focused
                        </h3>

                        <p>
                            Every part of StudyHub is designed
                            around the needs of students.
                        </p>

                    </div>


                    {/* VALUE 4 */}

                    <div className="value-card">

                        <div className="value-icon">
                            🚀
                        </div>

                        <h3>
                            Convenient
                        </h3>

                        <p>
                            Find products, manage your cart and
                            track your orders from one platform.
                        </p>

                    </div>

                </div>

            </section>


            {/* HOW IT WORKS */}

            <section className="about-how">

                <div className="how-heading">

                    <span className="section-label">
                        HOW IT WORKS
                    </span>

                    <h2>
                        Shopping Made Simple
                    </h2>

                </div>


                <div className="steps">


                    <div className="step">

                        <div className="step-number">
                            01
                        </div>

                        <h3>
                            Find Products
                        </h3>

                        <p>
                            Browse our collection of student
                            products and educational resources.
                        </p>

                    </div>


                    <div className="step">

                        <div className="step-number">
                            02
                        </div>

                        <h3>
                            Add to Cart
                        </h3>

                        <p>
                            Select the products you need and
                            add them to your shopping cart.
                        </p>

                    </div>


                    <div className="step">

                        <div className="step-number">
                            03
                        </div>

                        <h3>
                            Place Your Order
                        </h3>

                        <p>
                            Complete your order and keep track
                            of your purchase through your account.
                        </p>

                    </div>

                </div>

            </section>


            {/* CALL TO ACTION */}

            <section className="about-cta">

                <h2>
                    Ready to Start Shopping?
                </h2>

                <p>
                    Discover products that can support your
                    academic journey.
                </p>

                <button
                    onClick={() => navigate("/products")}
                >
                    Browse Products
                </button>

            </section>


            {/* FOOTER */}

            <footer className="about-footer">

                <p>
                    © 2026 StudyHub. All rights reserved.
                </p>

            </footer>

        </div>

    );
}

export default About;