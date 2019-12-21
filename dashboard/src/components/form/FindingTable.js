import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';

class FindingRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: 'Type', field: 'type' },
        { title: 'Rule ID', field: 'ruleId' },
        { title: 'Path', field: 'path' },
        { title: 'Position', field: 'position' },
        { title: 'Description', field: 'description' },
        { title: 'Severity', field: 'severity' },
      ],
      data: [],
    };
  }
  
  render() {
    const { state, props } = this;
    return (
      <MaterialTable
        title="Findings"
        options={{
          search: false,
          paging: false,
        }}
        columns={state.columns}
        data={props.data}
        editable={{
          onRowAdd: newData => {
            this.props.onRowAdd(newData);
            return Promise.resolve();
          },
          onRowUpdate: (newData, oldData) => {
            this.props.onRowUpdate(newData, oldData);
            return Promise.resolve();
          },
          onRowDelete: oldData => {
            this.props.onRowDelete(oldData);
            return Promise.resolve();
          },
        }}
      />
    );
  }
}

FindingRow.propTypes = {
  data: PropTypes.array,
  onRowAdd: PropTypes.func.isRequired,
  onRowUpdate: PropTypes.func.isRequired,
  onRowDelete: PropTypes.func.isRequired,
};
export default FindingRow;
