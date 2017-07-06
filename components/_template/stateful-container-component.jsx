/*
  <ComponentName>
  Stateful Container Component

  Component description...

  To import this elsewhere (directory nesting level may vary):
  import <ComponentName> from '../../<ComponentName>/<ComponentName>.jsx';
*/

import React from 'react';

class <ComponentName> extends React.Component {

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

export default <ComponentName>;
