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

    getInitialState: function() {
      return {
        rows: []
      }
    },

    componentDidMount: function() {
      $.getJSON('/MOCK_DATA.json')
        .done(function(res) {
          this.setState({rows: res});
        }.bind(this))
        .fail(function(err) {
          console.error('There was an error loading table data');
        }.bind(this));
    },

    render: function() {
      var rowsMarkup = []
        , headerRow = (
          <tr className="header">
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>E-mail</th>
            <th>Country</th>
            <th>IP Address</th>
          </tr>
        );

        // output rows
        $.each(this.state.rows, function (i, row) {
          if((i % 10 === 0) && (i !== 0)) {
            rowsMarkup.push(headerRow);
          }
          rowsMarkup.push(
            <tr className={(i % 2 === 0) ? 'even' : 'odd'}>
              <td>{row.id}</td>
              <td>{row.first_name}</td>
              <td>{row.last_name}</td>
              <td>{row.email}</td>
              <td>{row.country}</td>
              <td>{row.ip_address}</td>
            </tr>
          )
      });
        
      return (
        <div className="applicationInner">
          <table>
            <thead>
              {headerRow}
            </thead>
            <tbody>
              {rowsMarkup}
            </tbody>
          </table>
        </div>
      ); 
    }
  });
  
}(jQuery));

// Mount main application.
React.render(
  <Main />,
  document.getElementById('application')
);

