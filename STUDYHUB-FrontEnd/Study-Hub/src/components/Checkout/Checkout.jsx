import { useState } from "react";
import "./Checkout.css";

function Checkout() {

    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        address: "",
        city: "",
        postalCode: ""
    });

    const [message, setMessage] = useState("");

    function handleChange(event) {

        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });

    }

    function handleSubmit(event) {

        event.preventDefault();

        setMessage(
            "Order information submitted successfully!"
        );

    }

    return (

        <div className="checkout-page">

            <h1>Checkout</h1>

            <form
                className="checkout-form"
                onSubmit={handleSubmit}
            >

                <label>Full Name</label>

                <input
                    type="text"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    required
                />

                <label>Email</label>

                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <label>Address</label>

                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                />

                <label>City</label>

                <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                />

                <label>Postal Code</label>

                <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    required
                />

                <button type="submit">
                    Place Order
                </button>

            </form>

            {message && (
                <p className="checkout-message">
                    {message}
                </p>
            )}

        </div>
    );
}

export default Checkout;