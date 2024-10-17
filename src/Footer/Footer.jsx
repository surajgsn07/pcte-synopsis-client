import React from 'react';
import { FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'; // Import the icons
import "./Footer.css"
const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="contact-info">
                    <p>
                        Contact me on: 
                    </p>
                </div>
                <div className="social-media">
                    <a href="https://www.instagram.com/suraj_gsn_07" target="_blank" rel="noopener noreferrer" className="footer-icon">
                        <FaInstagram size={30} /> {/* React Icon for Instagram */}
                    </a>
                    <a href="https://www.linkedin.com/in/suraj-singh-431010248/" target="_blank" rel="noopener noreferrer" className="footer-icon">
                        <FaLinkedin size={30} /> {/* React Icon for LinkedIn */}
                    </a>
                    <a href="https://twitter.com/surajgsn07" target="_blank" rel="noopener noreferrer" className="footer-icon">
                        <FaTwitter size={30} /> {/* React Icon for Twitter */}
                    </a>
                </div>
            </div>
            <div className="copyright">
                © 2024 surajgsn07. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
