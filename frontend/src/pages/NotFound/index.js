import React from 'react';

import logo from '../../assets/logo.svg'
import heroesImg from '../../assets/heroes.png';

import './styles.css';

export default function NotFoundPage() {
    return (
            <div className="container">
                <div className="title">
                    <h1>
                        Not Found
                    </h1>
                </div>
                <img src={logo} alt="Heroes Logo"/>
                <img src={heroesImg} alt="Heroes"/>
            </div>
    );
}