import React, { Component } from "react";
import { Link } from "react-router-dom";
import TopNav from "../navbar/Navbar";
import API from "../../utils/API";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions"
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import coord from './coord.js';
import Address from './addresses'
import { InputGroup, Card, Button, Accordion } from 'react-bootstrap'


class Map extends Component {
  
  constructor() {
    super();    
    const initial = coord.map(data => <Address key={data.id} places={data} handleClick={this.handleClick} handleOnChange={this.handleOnChange} />);
    this.state = {
        api: [],
        done: false,
        viewport: {
            width: '75vw',
            height: '50vh',
            latitude: 36.1627,
            longitude: 86.7816,
            zoom: 9
        },
        setViewPort: null,
        navData: initial,
        selectedBrewery: null,
        latt: null,
        lngg: null,
        loc_name: null,
        user: [],
    toMap: [],
    toSave: [],
    hasCoord: []
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  componentDidMount() {
  this.loadMapData(this.props.auth)
  }

  handleClick = (id) => {

    //  console.log(id);
     console.log(this.state.navData);
   this.state.navData.map(res => {

    if(res.props.places.id === id){
      this.setState({

      latt: res.props.places.coordinates[0].lat,
      lngg: res.props.places.coordinates[0].lng,
      loc_name: res.props.places.name

      });

    }
    return this.state;
   });


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

  handleOnChange = (e) => {
   let txt = e.target.value.toLowerCase();
   const searched = this.state.api.filter(data => data.address.toLowerCase().includes(txt) ? data : null);

   const filtered = searched.map(data => <Address key={data.id} places={data} handleClick={this.handleClick} handleOnChange={this.handleOnChange} />)
   this.setState({
      navData: filtered
   });
  }

  handleKeyboardEvent = e => {
   if(e.key === 'Escape'){
       this.setState({

           latt: null,
           lngg: null,
           loc_name: null

       })
   }
   return window.removeEventListener("keydown", this);
  }

  onCheckmark = brewery => {
    if(this.state.toSave.includes(brewery.brew)){
      var holder = this.state.toSave.indexOf(brewery.brew);
      this.state.toSave.splice(holder, 1);
    }
    else{
      this.state.toSave.push(brewery.brew)
    }
  }

  loadMapData = (temp) => {
    API.getSearchData(temp.user.id)
     .then(res =>
       this.setUserState(res.data),
     ).then(()=>
       this.loadMap()
     )
     .catch(err => console.log(err));
  }

  setUserState = (data) => {
  this.setState({toMap: data});
  }

  getLastSearch = (data) => {
    let lastSearch = []
  }

  onSearchClick = event => {
    let temp = [];
    if(this.state.toMap.savedBreweries.length){
      temp = this.state.toSave.concat(this.state.toMap.savedBreweries)
    }
    else{
      temp = this.state.toSave
    }
    var tmp = [];
    for(var i = 0; i < temp.length; i++){
        if(tmp.indexOf(temp[i].id) == -1){
        tmp.push(temp[i].id);
        }
    }
    for(var i=0; i<tmp.length;i++){
      for(var j=0;j<temp.length;j++){
        if(tmp[i] === temp[j].id){
          tmp[i]= temp[j];
        }
      }
    }    
  API.saveFavorites(this.state.user.user.id, tmp)
  };

  loadMap = () => {
    //for putting in the map on page
    let tempArr = [];
    for(var i=0; i<this.state.toMap.mapBreweries.length; i++){
      if(this.state.toMap.mapBreweries[i].latitude){
        tempArr.push(this.state.toMap.mapBreweries[i]);
      }
    }
    this.setState({hasCoord: tempArr})
    
    if(this.state.hasCoord.length<1){
      this.setState({hasCoord: [{
        name: "No search results available",
        latitude: 36.1627,
        longitude: -86.7816,
        id: 1
      }]})
    }
    
    this.setState(
      {api : this.state.hasCoord,
      user: this.props.auth,
      navData: this.state.hasCoord.map(data => <Address key={data.id} places={data} handleClick={this.handleClick} handleOnChange={this.handleOnChange} />),
      done: true,
          viewport: {
              width: '80vw',
              height: '50vh',
              latitude: parseFloat(this.state.hasCoord[0].latitude),
              longitude: parseFloat(this.state.hasCoord[0].longitude),
              zoom: 9
          },
          setViewPort: null
      },
    ) 
  }

  

  setSelectedBrewery = object => {
    this.setState({
      selectedBrewery: object
    });
  };

  closePopup = () => {
    this.setState({
      selectedBrewery: null
    });
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
      const handleKey = window.addEventListener("keydown", this.handleKeyboardEvent);
      return (
        <div className="background">
          <TopNav />
          
            <div className="row mapboxWrapper">
              {/* <div className="col-sm-12 mapboxDiv">   */}
                <ReactMapGL {...this.state.viewport}
                  className="mapBox"
                  mapboxApiAccessToken={"pk.eyJ1IjoiaXNpb21hIiwiYSI6ImNqemhpcTYwMDBkaWIzZm16dG5ucHdweW0ifQ.fAQlsUYEzVN2st5qft2IKw"}
                  mapStyle="mapbox://styles/mapbox/streets-v11"
                  onViewportChange={(viewport) => this.setState({viewport})}>
                    
                  {this.state.navData.map(data => (
                    <Marker 
                      key={data.props.places.id} 
                      latitude={parseFloat(data.props.places.latitude)} 
                      longitude={parseFloat(data.props.places.longitude)} 
                    >
                      <div className= "mapMarkerStyle">  
                        <i className="fas fa-beer marker" onClick={() => {
                        this.setSelectedBrewery(data.props.places);
                        }}></i>
                      </div>
                    </Marker>
                  ))}
                  {this.state.selectedBrewery !== null ? (
      
                    <Popup
                      latitude={parseFloat(this.state.selectedBrewery.latitude)}
                      longitude={parseFloat(this.state.selectedBrewery.longitude)}
                      // onClose={this.closePopup}
                    >
                      <h6 className="popupName">{this.state.selectedBrewery.name}</h6>
                      <Button className="btn-danger closePopupButton" onClick={this.closePopup}>
                        X
                      </Button>
                      <h6><a href={`https://www.google.com/maps/dir/?api=1&destination=${this.state.selectedBrewery.latitude},${this.state.selectedBrewery.longitude}`} target="_blank" rel="noopener noreferrer">{this.state.selectedBrewery.street}, {this.state.selectedBrewery.city}</a></h6>
                    </Popup>
                    
                  ) : null }

                </ReactMapGL>
              {/* </div> */}
            </div>
            <br />
            <div className="row brewList">
              {this.state.toMap.mapBreweries ? (
              this.state.hasCoord.map(brew => (
              <div className="col-sm-12 col-xl-6 p-0" key={brew.id}>  
                <div className="mapBreweryCard">
                  <Accordion>
                    <Card>
                      <Card.Header>
                        <span className="brewCardTitle" onClick={() => {this.setSelectedBrewery(brew);}}>
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
                          <h6 className="breweryTypeAddress"> {brew.street}, {brew.city} </h6>
                          <h6 className="breweryTypeAddress"> <a href={`tel:${(brew.phone)}`}>{this.formatPhoneNumber(brew.phone)}</a> </h6>
                          <h6><a href={`https://www.google.com/maps/dir/?api=1&destination=${brew.latitude},${brew.longitude}`} target="_blank" rel="noopener noreferrer">Directions</a></h6>
                        </Card.Body>
                      </Accordion.Collapse>
                      <Card.Footer>
                        <InputGroup>
                          <InputGroup.Prepend>
                          <InputGroup.Checkbox onClick={() => this.onCheckmark({brew})}/>
                          <span className="mapCardFooterText">Add to Saved List</span>
                          </InputGroup.Prepend>
                        </InputGroup>
                      </Card.Footer>   
                    </Card> 
                  </Accordion>
                </div>
              </div>      

              ))
            ) : (
              <h3>No Results to Display</h3>
            )}
            <div className="col-sm-12 mapButtonDiv p-0">
                <Button 
                  id="mapPageButton"
                  style={{ color: 'inherit', textDecoration: 'inherit'}}
                >
                  <Link
                      to="/results"
                      style={{ color: 'inherit', textDecoration: 'inherit'}}
                    >
                     <i className="fas fa-chevron-left"></i> Results
                  </Link>
                </Button>
                <Button
                  id="mapPageButton"
                  style={{ color: 'inherit', textDecoration: 'inherit'}}
                >
                  <Link
                      to="/saved"
                      onClick={this.onSearchClick} 
                      style={{ color: 'inherit', textDecoration: 'inherit'}}
                    >
                      Save Breweries
                  </Link>
                </Button>
              </div>
            </div>
        </div>

      );
    }
  };

  Map.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(
    mapStateToProps,
    { logoutUser }
  )(Map);
