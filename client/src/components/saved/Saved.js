import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import TopNav from "../navbar/Navbar"
import { Button, Form, Card } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup'


class Saved extends Component {

    state = {
        user: this.props.auth,
        searchData: [],
        saved: []
      };

    componentDidMount() {
        this.loadMapData(this.props.auth)   
    }

    loadMapData = (temp) => {
        API.getFavorites(temp.user.id)
         .then(res =>
           this.setUserState(res.data),
         )
    }

    setUserState = (data) => {
        this.setState({saved: data});
        }

    formatPhoneNumber = (str) => {
        //Filter only numbers from the input
        let cleaned = ('' + str).replace(/\D/g, '');
        //Check if the input is of correct length
        let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return match[1] + '-' + match[2] + '-' + match[3]
        };
        return str
        };

    deleteBrew = brew => {
        for(var i=0;i<this.state.saved.savedBreweries.length;i++){
            if(this.state.saved.savedBreweries[i]===brew.brew){
               delete this.state.saved.savedBreweries[i];
               console.log("test")
            }
        }
        console.log(this.state.saved);
        var filtered = this.state.saved.savedBreweries.filter(function (el) {
            return el != null;
          });

        API.saveFavorites(this.state.user.user.id, filtered)
        // API.removeFavorite(this.state.user.user.id, brew.brew)
        .then(res => this.loadMapData(this.state.user))
        // .catch(err => console.log(err));
    };

    render() {
        return (
            <div class="background">

                <TopNav />

                <div className="container" >

            {this.state.saved.savedBreweries ? (
              this.state.saved.savedBreweries.map(brew => (
                <div className="section breweryCard" >
                  <div className="card is-horizontal columns" >
                    <div className="card-image column" >
                        <div className="columns is-one-quarter"> 
                          <InputGroup>
                            <InputGroup.Prepend>
                            <InputGroup.Checkbox onClick={() => this.deleteBrew({brew})}/>
                            </InputGroup.Prepend>
                          </InputGroup>
                          <div className="column">
                            <p className="breweryTypeAddress">
                              <strong>
                                <ins>
                                  {brew.name}
                                </ins>
                              </strong> 
                              <br/>
                              <b>Type: </b>{brew.brewery_type} | <b>Address: </b>{brew.street}, {brew.city}, {brew.state} | <b>Phone: </b>{this.formatPhoneNumber(brew.phone)}</p>
                            <a href={brew.website_url}>{brew.website_url}</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  
              ))
            ) : (
              <h3>No Saved Breweries to Display</h3>
            )}
          </div>



            </div>
        );
    }

}

Saved.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(
    mapStateToProps,
    { logoutUser }
  )(Saved);