import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Profile.css";

function Profile() {

    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false);

    const [profile, setProfile] = useState({
        fullname: "Laura Malengi",
        email: "laura@example.com",
        role: "Buyer"
    });

    const [message, setMessage] = useState("");


    // Handle profile changes
    function handleChange(event) {

        setProfile({
            ...profile,
            [event.target.name]: event.target.value
        });

    }


    // Save profile
    function handleSave() {

        setIsEditing(false);

        setMessage("Profile updated successfully!");

        setTimeout(() => {
            setMessage("");
        }, 3000);

    }


    // Logout
    function handleLogout() {

        localStorage.removeItem("token");

        navigate("/");

    }


    return (

        <div className="profile-page">

            <Navbar />


            {/* PAGE HEADER */}

            <section className="profile-header">

                <h1>
                    My Profile
                </h1>

                <p>
                    Manage your StudyHub account.
                </p>

            </section>


            {/* PROFILE CONTAINER */}

            <main className="profile-container">


                {/* PROFILE CARD */}

                <section className="profile-card">

                    <div className="profile-card-header">

                        <div className="profile-avatar">
                            LM
                        </div>

                        <div>

                            <h2>
                                {profile.fullname}
                            </h2>

                            <p>
                                {profile.email}
                            </p>

                        </div>

                    </div>


                    {/* MESSAGE */}

                    {message && (

                        <div className="profile-message">

                            {message}

                        </div>

                    )}


                    {/* PROFILE INFORMATION */}

                    <div className="profile-section">

                        <div className="section-title">

                            <h3>
                                Personal Information
                            </h3>

                            {!isEditing && (

                                <button
                                    className="edit-button"
                                    onClick={() =>
                                        setIsEditing(true)
                                    }
                                >
                                    Edit Profile
                                </button>

                            )}

                        </div>


                        {/* FULL NAME */}

                        <div className="profile-field">

                            <label>
                                Full Name
                            </label>

                            {isEditing ? (

                                <input
                                    type="text"
                                    name="fullname"
                                    value={profile.fullname}
                                    onChange={handleChange}
                                />

                            ) : (

                                <p>
                                    {profile.fullname}
                                </p>

                            )}

                        </div>


                        {/* EMAIL */}

                        <div className="profile-field">

                            <label>
                                Email Address
                            </label>

                            {isEditing ? (

                                <input
                                    type="email"
                                    name="email"
                                    value={profile.email}
                                    onChange={handleChange}
                                />

                            ) : (

                                <p>
                                    {profile.email}
                                </p>

                            )}

                        </div>


                        {/* ROLE */}

                        <div className="profile-field">

                            <label>
                                Account Type
                            </label>

                            <p className="role-badge">
                                {profile.role}
                            </p>

                        </div>


                        {/* SAVE BUTTON */}

                        {isEditing && (

                            <div className="edit-actions">

                                <button
                                    className="cancel-button"
                                    onClick={() =>
                                        setIsEditing(false)
                                    }
                                >
                                    Cancel
                                </button>

                                <button
                                    className="save-button"
                                    onClick={handleSave}
                                >
                                    Save Changes
                                </button>

                            </div>

                        )}

                    </div>


                    {/* ACCOUNT OPTIONS */}

                    <div className="profile-section">

                        <h3>
                            My Account
                        </h3>


                        <div className="account-options">


                            <button
                                onClick={() =>
                                    navigate("/wishlist")
                                }
                            >

                                <span>
                                    ♡
                                </span>

                                <div>

                                    <strong>
                                        My Wishlist
                                    </strong>

                                    <small>
                                        View your saved products
                                    </small>

                                </div>

                            </button>


                            <button
                                onClick={() =>
                                    navigate("/cart")
                                }
                            >

                                <span>
                                    🛒
                                </span>

                                <div>

                                    <strong>
                                        My Cart
                                    </strong>

                                    <small>
                                        View items in your cart
                                    </small>

                                </div>

                            </button>


                            <button
                                onClick={() =>
                                    alert(
                                        "Change password feature coming soon."
                                    )
                                }
                            >

                                <span>
                                    🔒
                                </span>

                                <div>

                                    <strong>
                                        Change Password
                                    </strong>

                                    <small>
                                        Update your account password
                                    </small>

                                </div>

                            </button>

                        </div>

                    </div>


                    {/* LOGOUT */}

                    <div className="logout-section">

                        <button
                            className="logout-button"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>

                    </div>

                </section>

            </main>


            {/* FOOTER */}

            <footer className="profile-footer">

                <p>
                    © 2026 StudyHub. All rights reserved.
                </p>

            </footer>

        </div>

    );

}

export default Profile;