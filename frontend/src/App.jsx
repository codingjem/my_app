import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

function App() {
    const isAuthenticated = false;
    return (
        <Router>
            <Routes>
                <Route path="/" element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/home" element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;