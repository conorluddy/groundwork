import React from 'react'
import { render } from 'react-dom';
import { Router, Route, hashHistory, Link, IndexRoute } from 'react-router';



var MainLayout = React.createClass({
 render: () => {
   return (
     <div className="app">
       <Link to="/test">Test</Link>
     </div>
   );
 }
});

var Test = React.createClass({
 render: () => {
   // Note the `className` rather than `class`
   // `class` is a reserved word in JavaScript, so JSX uses `className`
   // Ultimately, it will render with a `class` in the DOM
   return (
     <div>
       <Link to="/">Home</Link>
       <main></main>
     </div>
   );
 }
});


render((
    <Router history={hashHistory}>
      <Route path="/" component={MainLayout} ></Route>
      <Route path="/test" component={Test} ></Route>
    </Router>
), document.getElementById('app'))
