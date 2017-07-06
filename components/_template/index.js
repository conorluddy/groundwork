/*
  <ComponentName> component description goes here, please!

  To import this elsewhere:
  import <ComponentName> from '../<ComponentName>/<ComponentName>';
*/

import React from 'react'

export default class <ComponentName> extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="<ComponentClassName>">
        <ComponentName> component
        {this.props.children}
      </div>
    );
  }
}
