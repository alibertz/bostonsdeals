import React from 'react';

const Footer = () => {
    return (
        <footer>
            <h5>BOSTON'S DEALS</h5>
            <div className="footer">
                <div>
                    <i className="fab fa-twitter"></i>
                    <h3>Twitter</h3>
                    
                </div>
                <div>
                    <i className="fab fa-instagram"></i>
                    <h3>Instagram</h3>
                </div>
                <div>
                    <i className="far fa-comment-dots"></i>
                    <h3>Blog</h3>
                </div>
            </div>
            <p>Boston's Deals &copy;2020</p>
        </footer>
    );
};

export default Footer;