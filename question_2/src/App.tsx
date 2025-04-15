import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopUsersPage from "./pages/TopUsersPage";
import TrendingPostsPage from "./pages/TrendingPostsPage";
import FeedPage from "./pages/FeedPage";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<TopUsersPage />} />
                <Route path="/trending" element={<TrendingPostsPage />} />
                <Route path="/feed" element={<FeedPage />} />
            </Routes>
        </Router>
    );
};

export default App;
