import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import TopNav from "../navbar/Navbar"
import { Button, Form, Card } from 'react-bootstrap';

class Saved extends Component {

    render() {
        return (
            <div class="background">

                <TopNav />



            </div>
        );
    }

}

export default Saved;
