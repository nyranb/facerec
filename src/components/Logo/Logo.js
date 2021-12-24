import React from "react";
import Tilt from 'react-tilt';
import brain from './brain.png'
import './Logo.css';

const Logo = () => {
    return (
        <div className="ma4 mt0 center">
            <Tilt className="Tilt br3 shadow-2" options={{ max : 50 }} style={{ height: 200, width: 200 }} >
                <div className="Tilt-inner pa3"> <img style={{paddingTop: '40px'}} alt="logo" src={brain} /> </div>
            </Tilt>
        </div>
    )
}

export default Logo;