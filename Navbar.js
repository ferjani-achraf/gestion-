import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "./téléchargement.png";

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/");
    };

    return (
        <nav style={styles.navbar}>
            <div style={styles.left}>
                <img src={logo} alt="Logo" style={styles.logo} />
                <h1 style={styles.title}>ISET Kebili</h1>
            </div>
            <div style={styles.right}>
                <button style={styles.link} onClick={() => navigate("/")}>Accueil</button>
                <button style={styles.link} onClick={() => navigate("/")}>Actualités</button>
                <button style={styles.logout} onClick={handleLogout}>Déconnexion</button>
            </div>
        </nav>
    );
};

const styles = {
    navbar: {
        backgroundColor: "#000000",
        color: "#ffffff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 40px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
    },
    left: {
        display: "flex",
        alignItems: "center",
        gap: "20px",
    },
    logo: {
        width: "48px",
        height: "48px",
        borderRadius: "12px",
        objectFit: "cover",
        boxShadow: "0 2px 4px rgba(255, 255, 255, 0.2)",
    },
    title: {
        fontSize: "22px",
        fontWeight: "600",
        color: "#ffffff",
        letterSpacing: "0.5px",
    },
    right: {
        display: "flex",
        alignItems: "center",
        gap: "24px",
    },
    link: {
        backgroundColor: "transparent",
        border: "none",
        color: "#e0e0e0",
        fontSize: "15px",
        cursor: "pointer",
        padding: "6px 10px",
        borderRadius: "6px",
        transition: "background-color 0.2s ease, color 0.2s ease",
    },
    logout: {
        backgroundColor: "#e74c3c",
        border: "none",
        color: "white",
        fontSize: "14px",
        padding: "8px 16px",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: "500",
        transition: "background-color 0.2s ease",
    }
};

export default Navbar;
