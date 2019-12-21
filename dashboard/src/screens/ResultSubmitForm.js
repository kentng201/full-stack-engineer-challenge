import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../store/actions';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

import FindingTable from '../components/form/FindingTable';
import DateTimePicker from '../components/dialog/DateTimePicker';

import { withSnackbar } from 'notistack';

const scanStatus = ['Queued', 'In Progress', 'Success', 'Failed'];

class ResultSubmitForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'Queued',
      repositoryName: '',
      queuedAt: '',
      scanningAt: '',
      finishedAt: '',
      findings: [],
    };
    ValidatorForm.addValidationRule('timestamp', value => !value || value.match(/[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]/));
    ValidatorForm.addValidationRule('isScanningAtNeeded', value => value || scanStatus.indexOf(this.state.status) < 1);
    ValidatorForm.addValidationRule('isFinishedAtNeeded', value => value || scanStatus.indexOf(this.state.status) < 2);
  }

  notify = (msg, type = 'success') => {
    const key = this.props.enqueueSnackbar(msg, {
      variant: type,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center',
      },
    });
    setTimeout(() => this.props.closeSnackbar(key), 2500);
  };

  handleSubmit = async () => {
    const findings = this.state.findings.map(finding => ({
      type: finding.type,
      ruleId: finding.ruleId,
      location: {
        path: finding.path,
        positions: {
          begin: { line: Number.parseInt(finding.position) },
        },
      },
      metadata: {
        description: finding.description,
        severity: finding.severity,
      },
    }));
    const result = {...this.state, findings};
    try {
      await this.props.createScanResult(result);
      this.notify('Scanning result has been created successfully');
      this.props.history.push('/');
    } catch (error) {
      this.notify('Failed to upload result, please try again', 'error');
    }
  };

  render() {
    const handleChange = (event, state) => {
      this.setState({...this.state, [state]: event.target.value});
    };

    const handleFindingsAdd = (newData) => {
      const findings = [...this.state.findings];
      findings.push(newData);
      this.setState({ findings });
    };

    const handleFindingsUpdate = (newData, oldData) => {
      if (oldData) {
        const findings = [...this.state.findings];
        findings[findings.indexOf(oldData)] = newData;
        this.setState({ findings });
      }
    };

    const handleFindingsDelete = (oldData) => {
      const findings = [...this.state.findings];
      findings.splice(findings.indexOf(oldData), 1);
      this.setState({ findings });
    };

    return <div>
      <p style={styles.title}>Submit Scanning Result</p>
      <ValidatorForm
          ref="form"
          onSubmit={this.handleSubmit}
      >
        <TextValidator
          id="status"
          label="Status"
          select
          value={this.state.status}
          onChange={e => handleChange(e, 'status')}
          style={styles.textField}
        >
          {
            scanStatus.map(status =>
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            )
          }
        </TextValidator><br/><br/>

        <TextValidator
          id="repositoryName"
          validators={['required']}
          errorMessages={['Repository name is required']}
          label="Repository Name"
          value={this.state.repositoryName}
          onChange={e => handleChange(e, 'repositoryName')}
          style={styles.textField}
        /><br/><br/>
        
        <div style={styles.dateTimeRow}>
          <TextValidator
            id="queuedAt"
            label="Queued At"
            value={this.state.queuedAt}
            onChange={e => handleChange(e, 'queuedAt')}
            validators={['timestamp', 'required']}
            errorMessages={['Make sure it is timestamp format', 'Queued at is required']}
            style={styles.dateTimeField}
          />
          
          <DateTimePicker
            value={(dateTime) => this.setState({queuedAt: dateTime})}
          />
        </div>
        <br/><br/>

        <div style={styles.dateTimeRow}>
          <TextValidator
            id="scanningAt"
            label="Scanning At"
            value={this.state.scanningAt}
            validators={['timestamp', 'isScanningAtNeeded']}
            errorMessages={['Make sure it is timestamp format', 'Scanning at is required']}
            onChange={e => handleChange(e, 'scanningAt')}
            style={styles.dateTimeField}
          />
          
          <DateTimePicker
            value={(dateTime) => this.setState({scanningAt: dateTime})}
          />
        </div>
        <br/><br/>

        <div style={styles.dateTimeRow}>
          <TextValidator
            id="finishedAt"
            label="Finished At"
            value={this.state.finishedAt}
            validators={['timestamp', 'isFinishedAtNeeded']}
            errorMessages={['Make sure it is timestamp format', 'Finished at is required']}
            onChange={e => handleChange(e, 'finishedAt')}
            style={styles.dateTimeField}
          />
          
          <DateTimePicker
            value={(dateTime) => this.setState({finishedAt: dateTime})}
          />
        </div>
        <br/><br/>

        <FindingTable
          data={this.state.findings}
          onRowAdd={handleFindingsAdd}
          onRowUpdate={handleFindingsUpdate}
          onRowDelete={handleFindingsDelete}
        /><br/><br/>

        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button><br/><br/>
      </ValidatorForm>
    </div>;
  }
}

const styles = {
  title: {
    fontSize: '30px',
  },
  textField: {
    width: '400px',
  },
  dateTimeField: {
    width: '340px',
  },
  dateTimeRow: {
    display: 'flex',
    flexDirection: 'row',
  },
}

const mapStateToProps = state => ({
  results: state.scanResultReducer.results,
});
const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(
  withSnackbar(ResultSubmitForm),
);
