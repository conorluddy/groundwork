import React from 'react';


export React.createClass({
  render() {
    return (
      <div className="app">
        <Link to="/test">Test</Link>
        <main>{this.props.children}</main>
      </div>
    );
  }
});
