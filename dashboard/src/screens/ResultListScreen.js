import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../store/actions';

import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import MaterialTable from 'material-table';

class ResultListScreen extends Component {
  componentDidMount() {
    this.props.fetchResult();
  }

  handleResultClicked(rowData) {
    this.props.history.push(`/scan-detail/${rowData._id}`);
  }

  renderResult() {
    const { results } = this.props;
    const displayResult = results.map(result => {
      let timestamp;
      if (result.status === 'Queued') {
        timestamp = result.queuedAt;
      } else if (result.status === 'In Progress') {
        timestamp = result.scanningAt;
      } else {
        timestamp = result.finishedAt;
      }
      let findingCount = '';
      if (result.findings.length > 0) {
        findingCount = result.findings.length.toString(10);
      }
      return {
        ...result,
        repositoryName: result.repositoryName,
        status: result.status,
        timestamp,
        findingCount,
      };
    });
    return (
      <MaterialTable
        style={{maxHeight: window.innerHeight - 250, overflow: 'auto'}}
        options={{
          search: false,
          paging: false,
          toolbar: false,
        }}
        columns={[
          { title: 'Repo Name (Findings)', field: 'repositoryName', cellStyle: { width: '50%' }, render:
            rowData => <div>
              <span children={rowData.repositoryName} style={{ marginRight: '15px' }}/>
              {rowData.findingCount
                ? <Badge badgeContent={rowData.findingCount} color="error" /> 
                : null
              }
            </div>
          },
          { title: 'Status', field: 'status', cellStyle: { width: '10%' } },
          { title: 'Timestamp', field: 'timestamp', cellStyle: { width: '20%' } },
          { title: 'Action', render: rowData => <Button aria-label="add"><MoreHorizIcon/></Button> }
        ]}
        data={displayResult}
        onRowClick={(event, rowData) => {
          this.handleResultClicked(rowData);
        }}
      />
    );
  }

  render() {
    return <div>
      <p style={styles.title}>Scan Results</p>
      <Link to="/form" style={{ textDecoration: 'none' }}>
        <Button variant="contained" color="primary">
          Create Scanning Result
        </Button><br/><br/>
      </Link>
      {this.renderResult()}
    </div>;
  }
}


const styles = {
  title: {
    fontSize: '30px',
  },
}

const mapStateToProps = state => ({
  results: state.scanResultReducer.results,
});
const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ResultListScreen);
