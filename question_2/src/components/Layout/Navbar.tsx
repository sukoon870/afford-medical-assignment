import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
    const location = useLocation();

    const isActive = (path: string) => {
        return location.pathname === path ? "nav-link-active" : "nav-link";
    };

    return (
        <nav className="bg-white shadow-sm">
            <div className="container-custom">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <Link
                            to="/"
                            className="text-xl font-bold text-blue-600"
                        >
                            Social Analytics
                        </Link>
                    </div>
                    <div className="flex space-x-4">
                        <Link to="/" className={isActive("/")}>
                            Top Users
                        </Link>
                        <Link to="/trending" className={isActive("/trending")}>
                            Trending Posts
                        </Link>
                        <Link to="/feed" className={isActive("/feed")}>
                            Feed
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
