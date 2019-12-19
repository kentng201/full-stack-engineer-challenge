const mongoose = require('mongoose');

let resultSchema = new mongoose.Schema({
  status: {
    type: String, 
    enum: ['Queued', 'In Progress', 'Success', 'Failed'],
    required: true,
  },
  repositoryName: {
    type: String,
    required: true,
  },
  findings: [{
    type: {
      type: String,
      required: true,
    },
    ruleId: {
      type: String,
      required: true,
    },
    location: {
      path: {
        type: String,
        required: true,
      },
      positions: {
        type: String,
        required: true,
      },
    },
    metadata: {
      description: {
        type: String,
        required: true,
      },
      severity: {
        type: String,
        required: true,
      },
    },
  }],
  queuedAt: {
    type: String,
    required: true,
  },
  scanningAt: {
    type: String,
    required: true,
  }, 
  finishedAt: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Result', resultSchema);