import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import TopNav from "../navbar/Navbar"
import { Button, Form, Card, Jumbotron } from 'react-bootstrap';

class Dashboard extends Component {

  state = {
    user: this.props.auth,
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
    this.setState({searchData: data});
  }


  onSearchClick = e => {
    e.preventDefault();
    
  }

  render() {
    const { user } = this.props.auth;

    return (
      <div className="background">
        <TopNav />
        <Jumbotron>
          <div className="row">
            <div className="col-sm-12">
              <h4>
                <b>Hey there,</b> {user.name.split(" ")[0]}
                <p className="flow-text grey-text text-darken-1">
                  You are logged into {" "}
                  <span>BEER HIKER</span>
                </p>
              </h4>
              <Button>
              <Link
                  to="/beer"
                  
                  className="btn"
                >
                  Search
                </Link>
                </Button>
            </div>
          </div>
          <div className="row">
            
            {this.state.searchData.search ? (
                this.state.searchData.search.map(brew => (
                    <p>
                    Last Searches: {brew || "Not Used"}
                  </p>
                )
                )

                // <p>Last Search: {this.state.searchData.search[0]}</p>
                // <p>Last Mapped: {this.state.searchData.mapBreweries[0].name}</p>
                
              ) : (
                <h3>No Search Data to Display</h3>
              )}
          </div>
          <div className="row">
            
            {this.state.searchData.mapBreweries ? (
                this.state.searchData.mapBreweries.map(brew => (
                    <p>
                    Last Mapped: {brew.name}
                  </p>
                )
                )

                // <p>Last Search: {this.state.searchData.search[0]}</p>
                // <p>Last Mapped: {this.state.searchData.mapBreweries[0].name}</p>
                
              ) : (
                <h3>No Search Data to Display</h3>
              )}
          </div>
          <div className="row">
            
            {this.state.searchData.savedBreweries ? (
                this.state.searchData.savedBreweries.map(brew => (
                    <p>
                    Last Saved: {brew.name}
                  </p>
                )
                )

                // <p>Last Search: {this.state.searchData.search[0]}</p>
                // <p>Last Mapped: {this.state.searchData.mapBreweries[0].name}</p>
                
              ) : (
                <h3>No Search Data to Display</h3>
              )}
          </div>
      
      
      </Jumbotron>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);


