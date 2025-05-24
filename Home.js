import React from "react";
import { useNavigate } from "react-router-dom";
import log from "./rapport.png";
import dev from "./DevOps.png";
import sout from "./Soutenances.png";

const Home = () => {
    const navigate = useNavigate();

    const styles = {
        container: {
            maxWidth: 900,
            margin: "40px auto",
            padding: 20,
            textAlign: "center",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            color: "#1a202c",
        },
        title: {
            fontSize: 36,
            fontWeight: "700",
            marginBottom: 40,
            color: "#2c5282",
        },
        buttonGroup: {
            display: "flex",
            justifyContent: "center",
            gap: 25,
            flexWrap: "wrap",
        },
        button: {
            padding: "12px 30px",
            fontSize: 18,
            fontWeight: "600",
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
            minWidth: 160,
            boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
            transition: "background-color 0.3s ease, box-shadow 0.3s ease",
        },
        primaryButton: {
            backgroundColor: "#3182ce",
            color: "#fff",
        },
        primaryButtonHover: {
            backgroundColor: "#2b6cb0",
            boxShadow: "0 8px 20px rgba(49, 130, 206, 0.6)",
        },
        secondaryButton: {
            backgroundColor: "#4a5568",
            color: "#fff",
        },
        secondaryButtonHover: {
            backgroundColor: "#2d3748",
            boxShadow: "0 8px 20px rgba(74, 85, 104, 0.6)",
        },
        // Option annonces - prêt à être activé
        annonceContainer: {
            marginTop: 60,
            padding: 20,
            backgroundColor: "#f7fafc",
            borderRadius: 12,
            boxShadow: "inset 0 0 10px rgba(0,0,0,0.05)",
        },
        cardContainer: {
            display: "flex",
            justifyContent: "center",
            gap: 30,
            flexWrap: "wrap",
        },
        card: {
            width: 260,
            backgroundColor: "#fff",
            borderRadius: 12,
            boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
            padding: 20,
            textAlign: "center",
            transition: "transform 0.3s ease",
            cursor: "pointer",
        },
        cardHover: {
            transform: "translateY(-8px)",
            boxShadow: "0 14px 28px rgba(0,0,0,0.15)",
        },
        cardImg: {
            width: "100%",
            height: 160,
            objectFit: "cover",
            borderRadius: 10,
            marginBottom: 15,
        },
        date: {
            display: "inline-block",
            backgroundColor: "#ecc94b",
            color: "#fff",
            fontWeight: "700",
            padding: "6px 14px",
            borderRadius: 10,
            fontSize: 14,
            marginBottom: 10,
        },
    };

    // Pour gérer le hover inline, on peut utiliser React state, mais ce n’est pas idéal ici. 
    // On laisse l’animation simple sans hover en inline.

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Bienvenue à votre site scolaire</h1>

            <div style={styles.buttonGroup}>
                <button
                    onClick={() => navigate("/login")}
                    style={{ ...styles.button, ...styles.primaryButton }}
                    onMouseEnter={e => {
                        e.currentTarget.style.backgroundColor = styles.primaryButtonHover.backgroundColor;
                        e.currentTarget.style.boxShadow = styles.primaryButtonHover.boxShadow;
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.backgroundColor = styles.primaryButton.backgroundColor;
                        e.currentTarget.style.boxShadow = styles.button.boxShadow;
                    }}
                >
                    Se connecter
                </button>

                <button
                    onClick={() => navigate("/create-account")}
                    style={{ ...styles.button, ...styles.secondaryButton }}
                    onMouseEnter={e => {
                        e.currentTarget.style.backgroundColor = styles.secondaryButtonHover.backgroundColor;
                        e.currentTarget.style.boxShadow = styles.secondaryButtonHover.boxShadow;
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.backgroundColor = styles.secondaryButton.backgroundColor;
                        e.currentTarget.style.boxShadow = styles.button.boxShadow;
                    }}
                >
                    Créer un compte
                </button>
            </div>

            {/* Exemple d’annonces - décommenter si besoin */}
            {/*
            <section style={styles.annonceContainer}>
                <div style={styles.cardContainer}>
                    {[{img: log, title: "Rapports", date: "01 Mai 2025"},
                      {img: dev, title: "DevOps", date: "15 Juin 2025"},
                      {img: sout, title: "Soutenances", date: "30 Juil 2025"}].map(({img, title, date}) => (
                        <div key={title} style={styles.card}>
                            <img src={img} alt={title} style={styles.cardImg} />
                            <span style={styles.date}>{date}</span>
                            <h3>{title}</h3>
                            <p>Description courte de l’annonce.</p>
                        </div>
                    ))}
                </div>
            </section>
            */}
        </div>
    );
};

export default Home;
