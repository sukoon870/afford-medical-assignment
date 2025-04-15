import React from "react";
import Navbar from "./Navbar";

type LayoutProps = {
    children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
                <div className="container-custom">{children}</div>
            </main>
            <footer className="bg-gray-100 py-4">
                <div className="container-custom">
                    <p className="text-center text-gray-600 text-sm">
                        © {new Date().getFullYear()} All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
