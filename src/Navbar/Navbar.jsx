import React from 'react';
// import logo from './path/to/logo.png'; // Replace with your image path
import './Navbar.css'; // Import the CSS file for custom styling

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                {/* Navbar logo/image */}
                <a href="/" className="navbar-logo">
                    <img 
                        src={"logo.jpg"} 
                        alt="Logo" 
                        className="logo-img" 
                    />
                </a>
            </div>
        </nav>
    );
};

export default Navbar;
