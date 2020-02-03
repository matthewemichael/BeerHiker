import React from 'react';

const navbar = (props) => {
    return (
        <div>
            <button className="btn btn-dark btn_more" data-toggle="collapse" data-target="#searchdiv" aria-expanded="false" aria-controls="searchdiv"><i className="fa fa-bars" aria-hidden="true"></i></button>
            <div className="map_nav" id="searchdiv">

                <div className="search">
                    <h4> My Neighborhood</h4>
                    <br></br>
                    <input className="form-control form-control-md" type="text" placeholder="Search Map" onChange={props.searchText} />
                </div>

                {props.addressList}
            </div>
        </div>
    )
}



export default navbar