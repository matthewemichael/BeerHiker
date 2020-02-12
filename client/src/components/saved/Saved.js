import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

import API from "../../utils/API";
import TopNav from "../navbar/Navbar"
import { Button, Accordion, Card } from 'react-bootstrap';



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
      }
    }
    var filtered = this.state.saved.savedBreweries.filter(function (el) {
      return el != null;
    });

    API.saveFavorites(this.state.user.user.id, filtered)
    // API.removeFavorite(this.state.user.user.id, brew.brew)
    .then(res => this.loadMapData(this.state.user))
    // .catch(err => console.log(err));

  };

  collapse = event => {
    if(event.target.dataset.toggle === "true"){
      event.target.dataset.toggle = "false";
      event.target.className = "fas fa-chevron-up"
    }
    else{
      event.target.dataset.toggle = "true";
      event.target.className = "fas fa-chevron-down"
    }
  }

  render() {
    return (
      <div className="background">
        <TopNav />
          <div className ="row searchResultsContainer">
            <div className="col-sm-12 searchResultsTitle">
              <h1>
                <span>Saved Breweries</span>
              </h1>
              <hr className="resultsLine" />
            </div>
            {this.state.saved.savedBreweries ? (
              this.state.saved.savedBreweries.map(brew => (
              <div className="col-sm-12 col-xl-6 p-0" key={brew.id}>
                <div className="searchResultsCard">
                  <Accordion>
                    <Card>
                      <Card.Header>
                        <span className="savedCardTitle">
                          {brew.name}
                        </span>
                        <span>
                        <Accordion.Toggle as={Button} eventKey="0" onClick={this.collapse} >
                        <i className="fas fa-chevron-down" data-toggle={true}></i>
                        </Accordion.Toggle>
                        </span>
                      </Card.Header>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body>
                          <a href={`https://www.google.com/maps/dir/?api=1&destination=${brew.latitude},${brew.longitude}`} target="_blank" rel="noopener noreferrer"><h6 className="breweryTypeAddress"> {brew.street}, {brew.city} </h6></a>
                          <h6 className="breweryTypeAddress"> <a href={`tel:${(brew.phone)}`}>{this.formatPhoneNumber(brew.phone)}</a> </h6>
                          <h6><a href={brew.website_url} target="_blank" rel="noopener noreferrer">{brew.website_url}</a></h6>
                          <h6 className="breweryType">Brewery Type: {brew.brewery_type}</h6>
                        </Card.Body>
                      </Accordion.Collapse>
                      <Card.Footer>
                        <span>
                          <i className="fas fa-trash-alt" onClick={() => this.deleteBrew({brew})}></i>
                        </span>
                      </Card.Footer>   
                    </Card> 
                  </Accordion>
                </div>
              </div>

                
            ))
          ) : (
            <h3 className="searchResultsTitle">You Have No Saved Breweries</h3>
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

  // <InputGroup.Checkbox onClick={() => this.deleteBrew({brew})}/>