import React, { Component } from 'react';
import '../NavBarOut/NavBarOut.css';
import logo from '../../images/BeerHikerLogo2.jpg';


class NavBarOut extends Component {
    render () {
        return (
        <div className={`navBar`}>
            <div>
                <img src={logo} className={`logo`} alt='logo'/>  
            </div>
        </div>
        );
    }  
}; 

export default NavBarOut;