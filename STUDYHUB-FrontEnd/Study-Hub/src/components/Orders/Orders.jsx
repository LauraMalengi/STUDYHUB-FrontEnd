import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Orders.css";

function Orders() {

    const navigate = useNavigate();

    const orders = [
        {
            id: "SH-1001",
            date: "16 August 2026",
            status: "Delivered",
            total: 600,
            items: [
                {
                    name: "Computer Science Textbook",
                    quantity: 1,
                    price: 350,
                    image: "📚"
                },
                {
                    name: "Scientific Calculator",
                    quantity: 1,
                    price: 250,
                    image: "🧮"
                }
            ]
        },

        {
            id: "SH-1002",
            date: "10 August 2026",
            status: "Processing",
            total: 4500,
            items: [
                {
                    name: "Student Laptop",
                    quantity: 1,
                    price: 4500,
                    image: "💻"
                }
            ]
        },

        {
            id: "SH-1003",
            date: "02 August 2026",
            status: "Cancelled",
            total: 500,
            items: [
                {
                    name: "Programming Book",
                    quantity: 1,
                    price: 500,
                    image: "📖"
                }
            ]
        }
    ];


    // Status class
    function getStatusClass(status) {

        if (status === "Delivered") {
            return "status-delivered";
        }

        if (status === "Processing") {
            return "status-processing";
        }

        if (status === "Cancelled") {
            return "status-cancelled";
        }

        return "";

    }


    return (

        <div className="orders-page">

            <Navbar />


            {/* HEADER */}

            <section className="orders-header">

                <h1>
                    My Orders
                </h1>

                <p>
                    View and manage your StudyHub orders.
                </p>

            </section>


            {/* ORDERS */}

            <main className="orders-container">

                <div className="orders-title">

                    <h2>
                        Order History
                    </h2>

                    <span>
                        {orders.length} orders
                    </span>

                </div>


                {orders.length > 0 ? (

                    <div className="orders-list">

                        {orders.map((order) => (

                            <div
                                className="order-card"
                                key={order.id}
                            >

                                {/* ORDER TOP */}

                                <div className="order-top">

                                    <div>

                                        <span className="order-label">
                                            Order
                                        </span>

                                        <h3>
                                            #{order.id}
                                        </h3>

                                        <p>
                                            Placed on {order.date}
                                        </p>

                                    </div>


                                    <span
                                        className={`order-status ${getStatusClass(order.status)}`}
                                    >
                                        {order.status}
                                    </span>

                                </div>


                                {/* PRODUCTS */}

                                <div className="order-products">

                                    {order.items.map((item, index) => (

                                        <div
                                            className="order-product"
                                            key={index}
                                        >

                                            <div className="order-product-image">
                                                {item.image}
                                            </div>


                                            <div className="order-product-info">

                                                <h4>
                                                    {item.name}
                                                </h4>

                                                <p>
                                                    Quantity: {item.quantity}
                                                </p>

                                                <strong>
                                                    R{item.price.toLocaleString()}
                                                </strong>

                                            </div>

                                        </div>

                                    ))}

                                </div>


                                {/* ORDER BOTTOM */}

                                <div className="order-bottom">

                                    <div className="order-total">

                                        <span>
                                            Total
                                        </span>

                                        <strong>
                                            R{order.total.toLocaleString()}
                                        </strong>

                                    </div>


                                    <button
                                        className="view-order-button"
                                        onClick={() =>
                                            navigate(
                                                `/orders/${order.id}`
                                            )
                                        }
                                    >
                                        View Order
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                ) : (

                    /* EMPTY ORDERS */

                    <div className="empty-orders">

                        <div className="empty-orders-icon">
                            📦
                        </div>

                        <h2>
                            No Orders Yet
                        </h2>

                        <p>
                            You haven't placed any orders yet.
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


                {/* BACK TO SHOPPING */}

                <button
                    className="orders-shopping"
                    onClick={() =>
                        navigate("/products")
                    }
                >
                    ← Continue Shopping
                </button>

            </main>


            {/* FOOTER */}

            <footer className="orders-footer">

                <p>
                    © 2026 StudyHub. All rights reserved.
                </p>

            </footer>

        </div>

    );
}

export default Orders;