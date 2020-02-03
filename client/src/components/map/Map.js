import React, { Component } from "react";
// import "./map.css";
import 'bulma/css/bulma.css';
import { Link } from "react-router-dom";
import NavBarIn from "../NavBarIn/NavBarIn";
import API from "../../utils/API";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions"
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import coord from './coord.js';
import NavBar from './navbar';
import Address from './addresses'



class Map extends Component {
  
  constructor() {
    super();    
    const initial = coord.map(data => <Address key={data.id} places={data} handleClick={this.handleClick} handleOnChange={this.handleOnChange} />);
    this.state = {
        api: [],
        done: false,
        viewport: {
            width: '100vw',
            height: '100vh',
            latitude: 36.1627,
            longitude: 86.7816,
            zoom: 8
        },
        setViewPort: null,
        navData: initial,
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
  //  console.log(this.state.navData);
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

onSearchClick = event => {
  API.saveFavorites(this.state.user.user.id, this.state.toSave)
};

loadMap = () => {
  //for putting in the map on page
  let tempArr = [];
  console.log(this.state.toMap.mapBreweries)
  for(var i=0; i<this.state.toMap.mapBreweries.length; i++){
    if(this.state.toMap.mapBreweries[i].latitude){
      tempArr.push(this.state.toMap.mapBreweries[i]);
    }
  }
  this.setState({hasCoord: tempArr})
  if(this.state.hasCoord.length<1){
    this.setState({hasCoord: [{
      name: "No search results Available",
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
            width: '100vw',
            height: '100vh',
            marginLeft: '20vw',
            latitude: parseFloat(this.state.hasCoord[0].latitude),
            longitude: parseFloat(this.state.hasCoord[0].longitude),
            zoom: 8
        },
        setViewPort: null
    },
  ) 
}

// onCheckmark = brewery => {
//   if(this.state.toMap.includes(brewery.brew)){
//     var holder = this.state.toMap.indexOf(brewery.brew);
//     this.state.toMap.splice(holder, 1);
//   }
//   else{
//     this.state.toMap.push(brewery.brew)
//   }
//   console.log(this.state.toMap);
// };

    render() {
      const handleKey = window.addEventListener("keydown", this.handleKeyboardEvent);
      return (
        <div>
          <NavBarIn />
          <div className="container">
            <br />
            <div className="row center">
  
              <h1>
                {" "}
                <span>Map Results</span>
              </h1>
              <div>
            <ReactMapGL {...this.state.viewport}
                        mapboxApiAccessToken={"pk.eyJ1IjoiaXNpb21hIiwiYSI6ImNqemhpcTYwMDBkaWIzZm16dG5ucHdweW0ifQ.fAQlsUYEzVN2st5qft2IKw"}
                        mapStyle="mapbox://styles/isioma/cjzi11o2t2yjv1cqlraiqesb0"
                        onViewportChange={(viewport) => this.setState({viewport})}>
                {this.state.navData.map(data => (
                    <Marker key={data.props.places.id} latitude={parseFloat(data.props.places.latitude)} longitude={parseFloat(data.props.places.longitude)}>
                        <div className= "mapMarkerStyle">
                          {data.props.places.name[0]}<i className="fa fa-map-marker"></i></div>
                    </Marker>
                ))}
                {/* {this.state.latt && this.state.lngg ?
                    (<Popup
                        latitude={this.state.latt}
                        longitude={this.state.lngg}
                        onClose={() => {
                            this.setState({

                                latt: null,
                                lngg: null,
                                loc_name: null

                            });
                }}>
                        <div>
                            <h2>{this.state.loc_name}</h2>
                        </div>
                    </Popup>) : null
                } */}

            </ReactMapGL>
        </div>
            </div>
            <br />
            <div className="container" >
            {this.state.toMap.mapBreweries ? (
              this.state.hasCoord.map(brew => (

                <div className="section breweryCard" >
                  <div className="card is-horizontal columns" >
                    <div className="card-image column" >
                        <div className="columns is-one-quarter"> 
                          <label className="containerCheck">
                            <input type="checkbox" onClick={() => this.onCheckmark({brew})}/>
                            <span className="checkmark"></span>
                          </label>
                          <div className="column">
                            <p className="breweryTypeAddress">
                              <strong>
                                <ins>
                                  {brew.name}
                                </ins>
                              </strong> 
                              <br/>
                              <b>Address: </b>{brew.street}, {brew.city}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
               ))
              ) : (
                <h3>No Results to Display</h3>
              )}
            </div>
            <div className={`right`}>
              <Link to="/beer">
                <button className="button is-primary has-text-weight-bold">New Search</button>
              </Link>
              <Link to="/dashboard">
                <button onClick={this.onSearchClick} className="button is-black has-text-weight-bold">Save Breweries</button>
              </Link>
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
  
  // const stuff = this.state.toMap;

  // export {stuff}