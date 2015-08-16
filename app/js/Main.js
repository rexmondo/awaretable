/**
 * @file
 *
 * Defines and mounts main application code.
 */
"use strict";

var Main;

(function ($) {
  "use strict";

  // Define main application.
  Main = React.createClass({
    displayName: "Main",

    render: function render() {
      return React.createElement(
        "p",
        null,
        "Hello, World"
      );
    }
  });
})(jQuery);

// Mount main application.
React.render(React.createElement(Main, null), document.getElementById('application'));
//# sourceMappingURL=Main.js.map