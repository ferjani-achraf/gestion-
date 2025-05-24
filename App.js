import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SimpleLogin from "./components/SimpleLogin";
import EtudiantPage from "./components/Etudiant";
import EnseignantPage from "./components/Enseignant";
import AdminPage from "./components/AdminPage";
import Home from "./components/Home";
import CreateAccount from "./components/RegisterPage";
import Navbar from "./components/Navbar";
 // Assurez-vous que le chemin est correct
 // adapte le chemin si besoin


function isAuthenticated() {
    return !!localStorage.getItem("token");
}

const PrivateRoute = ({ children, allowedRole }) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) return <Navigate to="/login" />;
    if (allowedRole && role !== allowedRole) return <Navigate to="/" />;

    return children;
};

const App = () => {
    return (
        <div className="app-wrapper">
        <Router>
            <Navbar />
            <div className="main-content" style={{ minHeight: '120vh' }}>
            <Routes>
                {/* Page d'accueil */}
                <Route path="/" element={<Home />} />

                {/* Page de login */}
                <Route path="/login" element={<SimpleLogin />} />

                {/* Page de création de compte */}
                <Route path="/create-account" element={<CreateAccount />} />

                {/* Pages privées selon le rôle */}
                <Route
                    path="/etudiant"
                    element={
                        <PrivateRoute allowedRole="etudiant">
                            <EtudiantPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/enseignant"
                    element={
                        <PrivateRoute allowedRole="enseignant">
                            <EnseignantPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/admin"
                    element={
                        <PrivateRoute allowedRole="admin">
                            <AdminPage />
                        </PrivateRoute>
                    }
                />
            </Routes>
            </div>
        </Router>
        </div>
    );
};

export default App;