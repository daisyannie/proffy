import React from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg';

import './styles.css';

function LandingHeader() {
    return(
        <header className="landing-header">
            <div className="top-bar-container">
                <Link to="/">
                    <p>HOME</p>
                </Link>
                <Link to="/aboutUs">
                    <p>QUEM SOMOS</p>
                </Link>
                <img src={logoImg} alt="Proffy"/>
            </div>
        </header>
    );
}

export default LandingHeader;