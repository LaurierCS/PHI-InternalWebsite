import React, { Component } from "react";
import { Link } from "react-router-dom";
import {} from "./Landing.css";

class Landing extends Component {
  render() {
    return (
      <div
        style={{ height: "75vh" }}
        id="bg-landing"
        className="container valign-wrapper"
      >
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Phi</b> internal platform{" "}
              <span style={{ fontFamily: "monospace" }}>TO HELP</span> members
              within the club
            </h4>
            <p className="flow-text grey-text text-darken-1">
              Used for members of WLU Phi
            </p>
            <br />
            <div className="col s6">
              <Link
                to="/register"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                }}
                className="btn btn-large waves-effect waves-light hoverable red accent-2"
              >
                Register
              </Link>
            </div>
            <div className="col s6">
              <Link
                to="/login"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                }}
                className="btn btn-large waves-effect waves-light hoverable red accent-1"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
