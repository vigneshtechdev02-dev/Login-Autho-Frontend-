import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL= `https://login-autho-backend.onrender.com`;

function Login() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        try {

            const response = await axios.post(
                `${API_URL}/api/login`,
                form
            );

            localStorage.setItem(
                "primeUser",
                JSON.stringify(response.data.user)
            );

            setMessage("Login successful 🎉");

            setTimeout(() => {
                navigate("/home");
            }, 800);

        } catch (error) {

            setMessage(
                error.response?.data?.message ||
                "Login failed"
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
                    <h2>Welcome Back 👋</h2>
                    <p>Sign in to continue watching</p>
                </div>

                <form onSubmit={handleLogin}>

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
                            placeholder="Enter password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button
                        className="primary-btn"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Signing in..." : "Sign In 🎬"}
                    </button>

                </form>

                {message && (
                    <div className="message">
                        {message}
                    </div>
                )}

                <div className="switch-page">
                    New to PrimeStream?
                    <Link to="/signup"> Create Account</Link>
                </div>

            </div>

        </div>
    );
}

export default Login;