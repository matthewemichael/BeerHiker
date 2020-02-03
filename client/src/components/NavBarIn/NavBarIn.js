import React, { Component } from 'react';
import { Link } from "react-router-dom";
import '../NavBarIn/NavBarIn.css';
import logo from '../../images/BeerHikerLogo2.jpg';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";


class NavBarIn extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render () {
        return (
        <div className={`navBar`}>
            <div>
                <img src={logo} className={`logo`} alt='logo'/>  
            </div>
            <div className={`right`}>
                <Link to="/dashboard">
                <button className="button is-warning hoverable has-text-weight-bold">User Profile</button>
                </Link>
                <button onClick={this.onLogoutClick} className="button is-warning hoverable has-text-weight-bold">Logout</button>
            </div>
        </div>
        );
    }  
}; 


NavBarIn.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
  
const mapStateToProps = state => ({
auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(NavBarIn);

