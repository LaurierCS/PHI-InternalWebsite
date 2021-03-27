import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// Layout Components
import Navbar from './navbar/Navbar';

class Layout extends Component {

  render() {
    return (
      <React.Fragment>
          <Navbar />
            {this.props.children}
          {/* <Footer />    */}
      </React.Fragment>
    );
  }
}

export default withRouter(Layout);
