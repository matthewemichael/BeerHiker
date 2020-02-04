import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import logo from "../../images/bhlogo.png";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class TopNav extends Component {

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Brand>
          <img src={logo} alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/dashboard">Home</Nav.Link>
            <Nav.Link href="/beer">Search</Nav.Link>
            <Nav.Link href="/map">Map</Nav.Link>
            <Nav.Link href="/saved">Saved</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link className="logOut" onClick={this.onLogoutClick}>Log Out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

TopNav.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(TopNav);
