/**
 * @file
 *
 * Defines and mounts main application code.
 */
'use strict';

var Main;

(function ($) {
  "use strict";

  // Define main application.
  Main = React.createClass({
    displayName: 'Main',

    getInitialState: function getInitialState() {
      return {
        rows: []
      };
    },

    componentDidMount: function componentDidMount() {
      $.getJSON('/MOCK_DATA.json').done((function (res) {
        this.setState({ rows: res });
      }).bind(this)).fail((function (err) {
        console.error('There was an error loading table data');
      }).bind(this));
    },

    render: function render() {
      var rowsMarkup = [],
          headerRow = React.createElement(
        'tr',
        { className: 'header' },
        React.createElement(
          'th',
          null,
          'Id'
        ),
        React.createElement(
          'th',
          null,
          'First Name'
        ),
        React.createElement(
          'th',
          null,
          'Last Name'
        ),
        React.createElement(
          'th',
          null,
          'E-mail'
        ),
        React.createElement(
          'th',
          null,
          'Country'
        ),
        React.createElement(
          'th',
          null,
          'IP Address'
        )
      );

      // output rows
      $.each(this.state.rows, function (i, row) {
        if (i % 10 === 0 && i !== 0) {
          rowsMarkup.push(headerRow);
        }
        rowsMarkup.push(React.createElement(
          'tr',
          { className: i % 2 === 0 ? 'even' : 'odd' },
          React.createElement(
            'td',
            null,
            row.id
          ),
          React.createElement(
            'td',
            null,
            row.first_name
          ),
          React.createElement(
            'td',
            null,
            row.last_name
          ),
          React.createElement(
            'td',
            null,
            row.email
          ),
          React.createElement(
            'td',
            null,
            row.country
          ),
          React.createElement(
            'td',
            null,
            row.ip_address
          )
        ));
      });

      return React.createElement(
        'div',
        { className: 'applicationInner' },
        React.createElement(
          'table',
          null,
          React.createElement(
            'thead',
            null,
            headerRow
          ),
          React.createElement(
            'tbody',
            null,
            rowsMarkup
          )
        )
      );
    }
  });
})(jQuery);

// Mount main application.
React.render(React.createElement(Main, null), document.getElementById('application'));
//# sourceMappingURL=Main.js.map