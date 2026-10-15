import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./Contact.css";

function Contact() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const [submitted, setSubmitted] = useState(false);


    function handleChange(event) {

        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });

    }


    function handleSubmit(event) {

        event.preventDefault();

        setSubmitted(true);

        setFormData({
            name: "",
            email: "",
            subject: "",
            message: ""
        });

    }


    return (

        <div className="contact-page">

            <Navbar />


            {/* HERO */}

            <section className="contact-hero">

                <div>

                    <span>
                        GET IN TOUCH
                    </span>

                    <h1>
                        How Can We
                        <br />
                        <strong>Help You?</strong>
                    </h1>

                    <p>
                        Have a question about StudyHub?
                        Send us a message and our team
                        will be happy to help.
                    </p>

                </div>

            </section>


            {/* CONTACT CONTENT */}

            <main className="contact-container">


                {/* CONTACT INFORMATION */}

                <section className="contact-info">

                    <span className="contact-label">
                        CONTACT US
                    </span>

                    <h2>
                        We're Here To Help
                    </h2>

                    <p>
                        Whether you have a question about a
                        product, your order, your account, or
                        anything else, we'd love to hear from you.
                    </p>


                    <div className="contact-details">


                        <div className="contact-detail">

                            <div className="contact-icon">
                                📧
                            </div>

                            <div>

                                <h3>
                                    Email
                                </h3>

                                <p>
                                    support@studyhub.co.za
                                </p>

                            </div>

                        </div>


                        <div className="contact-detail">

                            <div className="contact-icon">
                                📞
                            </div>

                            <div>

                                <h3>
                                    Phone
                                </h3>

                                <p>
                                    +27 00 000 0000
                                </p>

                            </div>

                        </div>


                        <div className="contact-detail">

                            <div className="contact-icon">
                                📍
                            </div>

                            <div>

                                <h3>
                                    Location
                                </h3>

                                <p>
                                    South Africa
                                </p>

                            </div>

                        </div>

                    </div>

                </section>


                {/* CONTACT FORM */}

                <section className="contact-form-card">

                    <h2>
                        Send Us A Message
                    </h2>

                    <p>
                        Fill in the form below and we'll get
                        back to you.
                    </p>


                    {submitted && (

                        <div className="success-message">

                            ✓ Your message has been sent
                            successfully!

                        </div>

                    )}


                    <form onSubmit={handleSubmit}>


                        {/* NAME */}

                        <div className="form-group">

                            <label>
                                Full Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* EMAIL */}

                        <div className="form-group">

                            <label>
                                Email Address
                            </label>

                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* SUBJECT */}

                        <div className="form-group">

                            <label>
                                Subject
                            </label>

                            <input
                                type="text"
                                name="subject"
                                placeholder="What can we help you with?"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* MESSAGE */}

                        <div className="form-group">

                            <label>
                                Message
                            </label>

                            <textarea
                                name="message"
                                placeholder="Write your message..."
                                value={formData.message}
                                onChange={handleChange}
                                rows="6"
                                required
                            ></textarea>

                        </div>


                        {/* SUBMIT */}

                        <button
                            type="submit"
                            className="contact-submit"
                        >
                            Send Message
                        </button>

                    </form>

                </section>

            </main>


            {/* FAQ */}

            <section className="contact-faq">

                <div className="faq-heading">

                    <span className="contact-label">
                        FAQ
                    </span>

                    <h2>
                        Frequently Asked Questions
                    </h2>

                </div>


                <div className="faq-grid">


                    <div className="faq-card">

                        <h3>
                            How do I place an order?
                        </h3>

                        <p>
                            Browse our products, select the item
                            you want and add it to your cart.
                            Continue to checkout to complete
                            your order.
                        </p>

                    </div>


                    <div className="faq-card">

                        <h3>
                            How can I track my order?
                        </h3>

                        <p>
                            Once your order has been placed,
                            you can view its status from the
                            Orders section of your account.
                        </p>

                    </div>


                    <div className="faq-card">

                        <h3>
                            Can I save products?
                        </h3>

                        <p>
                            Yes. Use the wishlist feature to
                            save products that you would like
                            to view or purchase later.
                        </p>

                    </div>


                    <div className="faq-card">

                        <h3>
                            How do I contact StudyHub?
                        </h3>

                        <p>
                            You can use the contact form above
                            or send us an email using the
                            contact information provided.
                        </p>

                    </div>

                </div>

            </section>


            {/* FOOTER */}

            <footer className="contact-footer">

                <p>
                    © 2026 StudyHub. All rights reserved.
                </p>

            </footer>

        </div>

    );

}

export default Contact;