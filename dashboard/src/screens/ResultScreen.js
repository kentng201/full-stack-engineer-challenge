import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../store/actions';

import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';

import MaterialTable from 'material-table';

class ResultScreen extends Component {
  constructor(props) {
    super(props);
    const id = this.props.match.params.id || '';
    const result = this.props.results.find(result => result._id === id);
    if (result && Object.keys(result).length > 0) {
      this.state = result;
    }
  }

  componentDidMount() {
    if (!this.state) {
      this.props.fetchResult().then(results => {
        const id = this.props.match.params.id || '';
        const result = results.find(result => result._id === id);
        if (result && Object.keys(result).length > 0) {
          this.setState(result);
        }
      });
    }
  }

  renderFindings(findings) {
    const displayFindings = findings.map(finding => ({
      ruleId: finding.ruleId,
      severity: finding.metadata.severity,
      path: `Line ${finding.location.positions.begin.line} at ${finding.location.path}`,
      description: finding.metadata.description,
    }));
    return (
      <MaterialTable
        title="Findings"
        localization={{
          body: {
            emptyDataSourceMessage: 'Great! not findings was found in this repository.',
          },
        }}
        options={{
          search: false,
          paging: false,
        }}
        columns={[
          { title: 'Rule ID', field: 'ruleId', cellStyle: { width: '15%' } },
          { title: 'Severity', field: 'severity', cellStyle: { width: '15%' } },
          { title: 'Path', field: 'path', cellStyle: { width: '20%' } },
          { title: 'Description', field: 'description' },
          ]}
        data={displayFindings}
      />
    );
  }

  render() {
    const { state } = this;
    return state
      ? <div>
          <p style={styles.title}>Scan Result of repo: {state.repositoryName}</p>
          <p>Status: {state.status}</p>
          <p>Queued At: {state.queuedAt}</p>
          <p>Scanning At: {state.scanningAt || '--'}</p>
          <p>Finished At: {state.finishedAt || '--'}</p>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="primary">
              Back
            </Button><br/><br/>
          </Link>
          {this.renderFindings(state.findings)}<br/><br/>
        </div>
      : null;
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
export default connect(mapStateToProps, mapDispatchToProps)(ResultScreen);
