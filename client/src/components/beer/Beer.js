import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions"
import TopNav from "../navbar/Navbar";
import { Form, Button, Card } from "react-bootstrap";

class Beer extends Component {

  state = {
    user: this.props.auth,
    city: "",
    state: "",
    type: "",
    name: "",
    searchData: []
  };

  componentDidMount() {
    API.getSearchData(this.state.user.user.id)
      .then(res =>
        this.setUserState(res.data),
      )
      .catch(err => console.log(err));
   }

   setUserState = (data) => {
     if(data.search[1].length) {
      this.setState({searchData: data.search[1]});
    }
  }

  saveSearch = () => {
    let searchData = [this.state.state, this.state.city, this.state.name, this.state.type];
    API.saveSearch(searchData, this.state.user.user.id)
  };

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  onSearchClick = e => {
    e.preventDefault();
    
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };


  render() {
    return (
      <div className="background">
        <TopNav />
        <div className="searchContainer">
          <Card className="searchCard">
            <Card.Header>
              <div className="row">
                <div className="col-sm-12 text-center brewSearchTitleDiv">
                  <h3>
                    <span className="brewSearchTitle">Search for a Brewery</span>
                  </h3>
                </div>
              </div>
            </Card.Header>
            <Card.Body>
              <div className="row">
                <div className="col-sm-12">
                  <Form className="brewSearch">
                    <Form.Group>
                      <Form.Label className="searchFormLabel">City</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter City"
                        name="city" 
                        onChange={this.handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="searchForm.ControlSelect1">
                      <Form.Label>State</Form.Label>
                        <Form.Control 
                          as="select"
                          name="state"
                          onChange={this.handleInputChange}
                        >
                          <option value />
                          <option value="Alabama">Alabama</option>
                          <option value="Alaska">Alaska</option>
                          <option value="Arkansas">Arkansas</option>
                          <option value="Arizona">Arizona</option>
                          <option value="California">California</option>
                          <option value="Colorado">Colorado</option>
                          <option value="Connecticut">Connecticut</option>
                          <option value="Delaware">Delaware</option>
                          <option value="District_of_Columbia">District of Columbia</option>
                          <option value="Florida">Florida</option>
                          <option value="Georgia">Georgia</option>
                          <option value="Hawaii">Hawaii</option>
                          <option value="Idaho">Idaho</option>
                          <option value="Illinois">Illinois</option>
                          <option value="Indiana">Indiana</option>
                          <option value="Iowa">Iowa</option>
                          <option value="Kansas">Kansas</option>
                          <option value="Kentucky">Kentucky</option>
                          <option value="Louisiana">Louisiana</option>
                          <option value="Maine">Maine</option>
                          <option value="Maryland">Maryland</option>
                          <option value="Massachusetts">Massachusetts</option>
                          <option value="Michigan">Michigan</option>
                          <option value="Minnesota">Minnesota</option>
                          <option value="Mississippi">Mississippi</option>
                          <option value="Missouri">Missouri</option>
                          <option value="Montana">Montana</option>
                          <option value="Nebraska">Nebraska</option>
                          <option value="Nevada">Nevada</option>
                          <option value="New_Hampshire">New Hampshire</option>
                          <option value="New_Jersey">New Jersey</option>
                          <option value="New_Mexico">New Mexico</option>
                          <option value="New_York">New York</option>
                          <option value="North_Carolina">North Carolina</option>
                          <option value="North_Dakota">North Dakota</option>
                          <option value="Ohio">Ohio</option>
                          <option value="Oklahoma">Oklahoma</option>
                          <option value="Oregon">Oregon</option>
                          <option value="Pennsylvania">Pennsylvania</option>
                          <option value="Puerto_Rico">Puerto Rico</option>
                          <option value="Rhode_Island">Rhode Island</option>
                          <option value="Sout_Carolina">South Carolina</option>
                          <option value="South_Dakota">South Dakota</option>
                          <option value="Tennessee">Tennessee</option>
                          <option value="Texas">Texas</option>
                          <option value="Utah">Utah</option>
                          <option value="Vermont">Vermont</option>
                          <option value="Virginia">Virginia</option>
                          <option value="Washington">Washington</option>
                          <option value="West_Virginia">West Virginia</option>
                          <option value="Wisconsin">Wisconsin</option>
                          <option value="Wyoming">Wyoming</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label className="searchFormLabel">Brewery Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Optional"
                        name="name" 
                        onChange={this.handleInputChange}
                      />
                    </Form.Group>
                        
                    <Form.Group controlId="searchForm.ControlSelect2">
                      <Form.Label>Brewery Type</Form.Label>
                      <Form.Control 
                        as="select"
                        name="type"
                        onChange={this.handleInputChange}
                      >    
                        <option value>Optional</option>
                        <option value="bar">Bar</option>
                        <option value="micro">Micro Brewery</option>
                        <option value="regional">Regional Brewery</option>
                        <option value="brewpub">Brewpub</option>
                        <option value="large">Large Brewery</option>
                        <option value="planning">In planning</option>
                        <option value="contract">Contract Brewery</option>
                        <option value="proprietor">Proprietor</option>
                      </Form.Control>
                    </Form.Group>   
                      <Button 
                        className="brewSearchButton"
                        style={{ color: 'inherit', textDecoration: 'inherit'}}
                      >
                        <Link
                            to="/results"
                            onClick = {this.saveSearch}
                            style={{ color: 'inherit', textDecoration: 'inherit'}}
                          >
                            Submit
                        </Link>
                      </Button>
                  </Form>
                </div>
              </div>
            </Card.Body>
            <Card.Footer>
            <div className="row">
              <div className="col-sm-12">
                {this.state.searchData.search ? 
                  (
                    <p className="lastSearched">Last Search Location: <span className="lastSearchedCity">{this.state.searchData}</span></p>      
                  ) : 
                  (
                    <p>{'\u00A0'}</p>
                  )      
                } 
              </div>
            </div>
            </Card.Footer>
          </Card>
        </div>
      </div>
    
    );
  }
}

Beer.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Beer);
  
