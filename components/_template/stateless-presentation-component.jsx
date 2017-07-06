/*
  <ComponentName>
  Stateless Presentation Component

  Component description...

  To import this elsewhere (directory nesting level may vary):
  import <ComponentName> from '../../<ComponentName>/<ComponentName>.jsx';
*/

import React from 'react';

const <ComponentName> = (props) => {
  return (
    <div className="<ComponentClassName>">
     <ComponentName> component
     {props.children}
    </div>
  )
};

//<ComponentName>.propTypes = { children: React.PropTypes.string };
//<ComponentName>.defaultProps = { children: 'Hello World!' };

export default <ComponentName>;
