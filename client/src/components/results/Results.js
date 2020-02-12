import React, { Component } from "react";
import TopNav from "../navbar/Navbar";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Card, Button, Accordion, InputGroup } from 'react-bootstrap'



// import { Link } from "react-router-dom";

class Results extends Component {

  state = {
    user: this.props.auth,
    searchData: [],
    searchResults: [],
    toMap: []
  };

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

  componentDidMount() {
    
    this.loadUserData();     
    
  }

  loadUserData = () => {
    API.getSearchData(this.state.user.user.id)
      .then(res =>
        this.setUserState(res.data),
      ).then(()=>
        this.getBreweryData()
      )
      .catch(err => console.log(err));
  }

  getBreweryData = () => {
    API.getBreweries(this.state.searchData.search[0],this.state.searchData.search[1],this.state.searchData.search[2],this.state.searchData.search[3])
      .then(res =>
        this.setResultState(res.data),
      )
      .catch(err => console.log(err));
  }

  setUserState = (data) => {
    this.setState({searchData: data});
  }

  setResultState = (data) => {

    // // Use this to prevent display of search results that don't have lat and long coords
    // // ---------------------------------------------------------------------------------
    // let resultsWithCoords = [];
    // for(var i=0; i<data.length; i++){
    //   if(data[i].latitude){
    //     resultsWithCoords.push(data[i]);
    //   }
    // }
    
    // this.setState({searchResults: resultsWithCoords})
    this.setState({searchResults: data})
  }

  onSearchClick = event => {
    
    // Use this to display all search results. It Won't pass through check marked breweries that don't
    // have coordinates.  Without one of the two solutions no breweries will be mapped after
    // the first one not conataining coordinates that is selected 
    // (example: user selects the first five breweries and clicks the map button. the third brewery doesn't
    // have lat/long coords provided from the api. now the fourth and fifth breweries won't be mapped either.)
    let withCoords = [];
    for (var i=0; i<this.state.toMap.length; i++){
      if (this.state.toMap[i].latitude){
        withCoords.push(this.state.toMap[i]);
      }
    }
    API.saveResults(this.state.user.user.id, withCoords)
  };

  onCheckmark = brewery => {
    
    if(this.state.toMap.includes(brewery.brew)){
      var holder = this.state.toMap.indexOf(brewery.brew);
      this.state.toMap.splice(holder, 1);
    }
    else{
      this.state.toMap.push(brewery.brew)
    }
  };

  collapse = event => {
    if(event.target.dataset.toggle === "true"){
      event.target.dataset.toggle = "false";
      event.target.className = "fas fa-chevron-down"
    }
    else{
      event.target.dataset.toggle = "true";
      event.target.className = "fas fa-chevron-up"
    }
  }


  render() {
    return (
      <div className="background">
        <TopNav />
        <div className="row searchResultsContainer">
          <div className="col-sm-12 searchResultsTitle">
            <h1>
              <span>Search Results</span>
            </h1>
            <hr className="resultsLine" />
          </div>
          {this.state.searchResults.length ? (
            this.state.searchResults.map(brew => (
              <div className="col-sm-12 p-0" key={brew.id}>
                <div className="searchResultsCard">
                  <Accordion defaultActiveKey="0">
                    <Card>
                      <Card.Header>
                        <span className="brewCardTitle">
                          {brew.name}
                        </span>
                        <span>
                        <Accordion.Toggle as={Button} eventKey="0" onClick={this.collapse} >
                        <i className="fas fa-chevron-up" data-toggle={true}></i>
                        </Accordion.Toggle>
                        </span>
                      </Card.Header>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body>
                          <h6 className="breweryTypeAddress"> {brew.street}, {brew.city} </h6>
                          <h6 className="breweryTypeAddress"> <a href={`tel:${(brew.phone)}`}>{this.formatPhoneNumber(brew.phone)}</a> </h6>
                          <h6><a href={brew.website_url} target="_blank" rel="noopener noreferrer">{brew.website_url}</a></h6>
                          <h6 className="breweryType">Brewery Type: {brew.brewery_type}</h6>
                        </Card.Body>
                      </Accordion.Collapse>
                      <Card.Footer>
                        <InputGroup>
                          <InputGroup.Prepend>
                          <InputGroup.Checkbox onClick={() => this.onCheckmark({brew})}/>
                          <span className="mapCardFooterText">View on Map</span>
                          </InputGroup.Prepend>
                        </InputGroup>
                      </Card.Footer>   
                    </Card> 
                  </Accordion>
                </div>
              </div>
        
            ))
          ) : (
            <h3 className="searchResultsTitle">No Results to Display</h3>
          )}  
          <div className="col-sm-12 mapButtonDiv p-0">
            <Button 
              id="mapPageButton"
              style={{ color: 'inherit', textDecoration: 'inherit'}}
            >
              <Link
                  to="/map"
                  onClick={this.onSearchClick}
                  style={{ color: 'inherit', textDecoration: 'inherit'}}
                >
                  Map Selected
              </Link>
            </Button>
            <Button
              id="mapPageButton"
              style={{ color: 'inherit', textDecoration: 'inherit'}}
            >
              <Link
                  to="/beer"
                  style={{ color: 'inherit', textDecoration: 'inherit'}}
                >
                  New Search
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }
};


Results.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Results);
