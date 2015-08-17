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

    setFilter: function setFilter(e) {
      this.setState({ filterValue: e.target.value });
    },

    setFilterType: function setFilterType(e) {
      this.setState({ filterType: e.target.value });
    },

    setHeaderRepeat: function setHeaderRepeat(e) {
      this.setState({ headerRepeat: parseInt(e.target.value) });
    },

    getInitialState: function getInitialState() {
      return {
        rows: [],
        filterValue: '',
        filterType: 'first_name',
        headerRepeat: 10
      };
    },

    componentDidMount: function componentDidMount() {
      $.getJSON('/MOCK_DATA.json').done((function (res) {
        this.setState({ rows: res });
      }).bind(this)).fail(function (err) {
        console.error('There was an error loading table data');
      });
    },

    render: function render() {
      var renderRows = this.state.rows,
          filteredRows,
          rowsMarkup = [],
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
      ),
          filterRegex = new RegExp(this.state.filterValue);

      // filter rows
      filteredRows = renderRows.filter((function (row) {
        return row[this.state.filterType].match(filterRegex) !== null;
      }).bind(this));

      // build table rows
      $.each(filteredRows, (function (i, row) {
        if (i % this.state.headerRepeat === 0 && i !== 0) {
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
      }).bind(this));

      return React.createElement(
        'div',
        { className: 'applicationInner' },
        React.createElement('input', { type: 'textfield', placeholder: 'Filter', onChange: this.setFilter }),
        React.createElement(
          'span',
          { className: 'form-explain filter' },
          ' By: '
        ),
        React.createElement(
          'select',
          { value: this.state.filterType, onChange: this.setFilterType },
          React.createElement(
            'option',
            { value: 'first_name' },
            'First Name'
          ),
          React.createElement(
            'option',
            { value: 'last_name' },
            'Last Name'
          ),
          React.createElement(
            'option',
            { value: 'email' },
            'E-mail'
          ),
          React.createElement(
            'option',
            { value: 'country' },
            'Country'
          ),
          React.createElement(
            'option',
            { value: 'ip_address' },
            'IP Address'
          )
        ),
        React.createElement(
          'span',
          { className: 'form-explain repeat' },
          ' Header Repeat: '
        ),
        React.createElement('input', { type: 'number', value: this.state.headerRepeat, min: '5', max: '20', step: '1', onChange: this.setHeaderRepeat }),
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