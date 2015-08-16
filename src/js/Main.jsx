/**
 * @file
 *
 * Defines and mounts main application code.
 */
var Main; 

(function($) {
  "use strict";

  // Define main application.
  Main = React.createClass({
    render: function() {
      return (
        <p>Hello, World</p>
      ); 
    }
  });
  
}(jQuery));

// Mount main application.
React.render(
  <Main />,
  document.getElementById('application')
);

