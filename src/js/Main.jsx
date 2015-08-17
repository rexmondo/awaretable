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

    setFilter: function(e) {
      this.setState({filterValue: e.target.value});
    },

    setFilterType: function(e) {
      this.setState({filterType: e.target.value});
    },

    setHeaderRepeat: function(e) {
      this.setState({headerRepeat: parseInt(e.target.value)});
    },

    getInitialState: function() {
      return {
        rows: [],
        filterValue: '',
        filterType: 'first_name',
        headerRepeat: 10
      }
    },

    componentDidMount: function() {
      $.getJSON('/MOCK_DATA.json')
        .done(function(res) {
          this.setState({rows: res});
        }.bind(this))
        .fail(function(err) {
          console.error('There was an error loading table data');
        });
    },

    render: function() {
      var renderRows = this.state.rows
        , filteredRows
        , rowsMarkup = []
        , headerRow = (
            <tr className="header">
              <th>Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>E-mail</th>
              <th>Country</th>
              <th>IP Address</th>
            </tr>
          )
        , filterRegex = new RegExp(this.state.filterValue);

        // filter rows
        filteredRows = renderRows.filter(function(row) {
          return (row[this.state.filterType].match(filterRegex) !== null);
        }.bind(this));

        // build table rows
        $.each(filteredRows, function (i, row) {
          if((i % this.state.headerRepeat === 0) && (i !== 0)) {
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
          );
      }.bind(this));
        
      return (
        <div className="applicationInner">
          <input type="textfield" placeholder="Filter" onChange={this.setFilter}></input>
          <span className="form-explain filter"> By: </span>
          <select value={this.state.filterType} onChange={this.setFilterType}>
            <option value="first_name">First Name</option>
            <option value="last_name">Last Name</option>
            <option value="email">E-mail</option>
            <option value="country">Country</option>
            <option value="ip_address">IP Address</option>
          </select>
          <span className="form-explain repeat"> Header Repeat: </span>
          <input type="number" value={this.state.headerRepeat} min="5" max="20" step="1" onChange={this.setHeaderRepeat}></input>
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

