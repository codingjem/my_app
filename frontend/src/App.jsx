import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import { MenuProvider } from "./contexts/MenuContext";

function App() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    return (
        <MenuProvider>
            <Router>
                <Routes>
                    <Route path="/" element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/home" element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} />
                </Routes>
            </Router>
        </MenuProvider>
    );
}

export default App;
