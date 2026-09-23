import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("primeUser")
    );

    const logout = () => {
        localStorage.removeItem("primeUser");
        navigate("/login");
    };

    return (
        <div className="home-page">

            <nav className="navbar">

                <div className="brand">
                    <span>▶</span>
                    <h1>prime<span>stream</span></h1>
                </div>

                <button
                    className="logout-btn"
                    onClick={logout}
                >
                    Logout
                </button>

            </nav>

            <main className="hero">

                <div className="hero-content">

                    <span className="premium-tag">
                        ✨ PREMIUM MEMBER
                    </span>

                    <h2>
                        Welcome,
                        <strong> {user?.username}</strong> 🎬
                    </h2>

                    <p>
                        Your account is successfully connected.
                        Enjoy your personalized streaming experience.
                    </p>

                    <button
                        className="watch-btn"
                        onClick={() => {
                            window.location.href =
                                "https://www.primevideo.com/";
                        }}
                    >
                        Watch on Prime Video ▶
                    </button>

                </div>

            </main>

        </div>
    );
}

export default Home;