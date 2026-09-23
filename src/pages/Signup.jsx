import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL = `https://login-autho-backend.onrender.com`;

function Signup() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        try {

            const response = await axios.post(
                `${API_URL}/api/signup`,
                form
            );

            setMessage(response.data.message);

            setTimeout(() => {
                navigate("/login");
            }, 1200);

        } catch (error) {

            setMessage(
                error.response?.data?.message ||
                "Signup failed"
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">

            <div className="background-glow glow-one"></div>
            <div className="background-glow glow-two"></div>

            <div className="auth-card">

                <div className="brand">
                    <span>▶</span>
                    <h1>prime<span>stream</span></h1>
                </div>

                <div className="welcome">
                    <h2>Create Account ✨</h2>
                    <p>Join your premium streaming experience</p>
                </div>

                <form onSubmit={handleSignup}>

                    <div className="input-group">
                        <label>👤 User Name</label>

                        <input
                            type="text"
                            name="username"
                            placeholder="Enter username"
                            value={form.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>📧 Gmail</label>

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter Gmail"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>🔐 Password</label>

                        <input
                            type="password"
                            name="password"
                            placeholder="Create password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>🔒 Confirm Password</label>

                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm password"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button
                        className="primary-btn"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Creating..." : "Create Account 🚀"}
                    </button>

                </form>

                {message && (
                    <div className="message">
                        {message}
                    </div>
                )}

                <div className="switch-page">
                    Already have an account?
                    <Link to="/login"> Sign In</Link>
                </div>

            </div>

        </div>
    );
}

export default Signup;