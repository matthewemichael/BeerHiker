import React, { Component } from "react";


class NoMatch extends Component {
    render() {
      return (
        <div style={{ height: "75vh" }} className="container valign-wrapper">
          <div className="row">
            <div className="col s12 center-align">
              <h4>
                {" "}
                <span style={{ fontFamily: "monospace" }}>PAGE NOT FOUND</span>
              </h4>
              </div>
            </div>
          </div>
      );
    }
  }
  
  export default NoMatch;