import * as types from '../types';
import { api } from "../../api";

function setResults(results) {
  return {
    type: types.SET_RESULTS,
    results,
  };
}

export function fetchResult() {
  return async (dispatch) => {
    try {
      const results = await api().get('/api/results');
      await dispatch(setResults(results));
      return results;
    } catch (error) {
      console.log(error);
    }
  };
}

export function createScanResult(result) {
  return async () => {
    await api().post('/api/results', result);
  };
}