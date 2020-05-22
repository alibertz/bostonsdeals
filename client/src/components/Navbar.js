import React, { Component } from 'react';

class Navbar extends Component {

    state = {
        navOpened: false
    }

    openNav = () => {
        document.querySelector('#nav').style.width = '100%';
        document.querySelector('#nav').style.left = '0';
        this.setState({navOpened: true});
    }
    
    closeNav = () => {
        document.querySelector('#nav').style.width = '0%';
        document.querySelector('#nav').style.left = '-2rem';
        this.setState({navOpened: false});
    }

    render() {
        return (
            
            <div className="nav">
                <div id="nav" className="overlay">
                    <a className="close" onClick={this.closeNav}>&times;</a>
                    <div className="overlay-content">
                        <div><i class="fas fa-beer"></i>DRINK DEALS</div>
                        <div><i class="fas fa-drumstick-bite"></i>CHEAP WINGS</div>
                        <div><i class="fas fa-leaf"></i>$1 OYSTERS</div>
                        <div style={{fontSize: '.8rem'}}><i class="fas fa-graduation-cap"></i>STUDENT DEALS</div>
                        
                    </div>

                    <hr />

                    <div className="about-content">
                        <h4 className="about">ABOUT</h4>
                        <h4 className="blog">BLOG</h4>
                        <h4 className="contact">CONTACT US</h4>
                    </div>

                    <h4>BOSTON'S DEALS</h4>
                </div>
                <span onClick={this.openNav} className="hamburgIcon">&#9776;</span>            
            </div>
        );
    }
}

export default Navbar;