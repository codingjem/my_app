import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={ <HomePage/> } />
                <Route path="/login" />
                <Route path="/signup" />
                <Route path="/home" />
            </Routes>
        </Router>
    );
}

export default App;
