import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions"
import NavBarIn from "../NavBarIn/NavBarIn";

class Beer extends Component {

  state = {
    user: this.props.auth,
    city: "",
    state: "",
    type: "",
    name: ""
  };

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
          <NavBarIn />
          <div className="container">
            <br />
            <div className="row center">
              <h1>
                {" "}
                <span>SEARCH FOR A BREWERY</span>
              </h1>
            </div>
            <br />
            <div className="columns is-centered">
              <div className="column is-two-thirds">
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">City</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <input className="input" type="text" placeholder="City" name="city" onChange={this.handleInputChange}/>
                      <p />
                    </div>
                  </div>
                </div>
              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label">State</label>
                </div>
                <div className="field-body">
                  <div className="field is-wide">
                    <div className="control">
                      <div className="select is-fullwidth">
                        <select name="state" onChange={this.handleInputChange}>
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
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label">Brewery Name</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <input className="input" type="text" placeholder="Optional" name="name" onChange={this.handleInputChange}/>
                    <p />
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label">Brewery Type</label>
                </div>
                <div className="field-body">
                  <div className="field is-wide">
                    <div className="control">
                      <div className="select is-fullwidth">
                        <select name="type" onChange={this.handleInputChange}>
                          <option value>Optional</option>
                          <option value="bar">Bar</option>
                          <option value="micro">Micro Brewery</option>
                          <option value="regional">Regional Brewery</option>
                          <option value="brewpub">Brewpub</option>
                          <option value="large">Large Brewery</option>
                          <option value="planning">In planning</option>
                          <option value="contract">Contract Brewery</option>
                          <option value="proprietor">Proprietor</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-label">
                </div>
                <div className="field-body">
                  <div className="field">
                    <Link
                        to="/results"
                        style={{
                          width: "150px",
                          borderRadius: "3px",
                          letterSpacing: "1.5px",
                          marginTop: "1rem"
                        }}
                        onClick = {this.saveSearch}
                        className="btn btn-large waves-effect waves-light hoverable orange accent-3"
                      >
                        Submit
                      </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
  
