import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" />
                <Route path="/login" />
                <Route path="/signup" />
                <Route path="/home" />
            </Routes>
        </Router>
    );
}

export default App;
