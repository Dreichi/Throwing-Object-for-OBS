import React from 'react';
import '../css/navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';


const Navbar = ({ onLogout }) => {
    const username = sessionStorage.getItem('username');
    const profileImageUrl = sessionStorage.getItem('profile_image_url');

    return (
        <div className="navbar">
            <div className="navbar-top">
                <img src={profileImageUrl} alt={username} className="profile-picture" />
            </div>
            <div className="navbar-bottom">
                <button onClick={onLogout} className="logout-button">Se déconnecter <FontAwesomeIcon icon={faArrowRight} /></button>
            </div>
        </div>
    );
}

export default Navbar;
