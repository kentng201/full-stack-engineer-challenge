import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import "./App.css";

import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

import { SnackbarProvider } from 'notistack';
import NavBar from './components/titleBar/NavBar';
import ResultListScreen from './screens/ResultListScreen';
import ResultScreen from './screens/ResultScreen';
import ResultSubmitForm from './screens/ResultSubmitForm';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <SnackbarProvider maxSnack={3}>
          <Router>
            <NavBar />
            <div style={{marginTop: '80px', marginLeft: '30px', marginRight: '30px'}}>
                <div>
                  <Route exact path="/" component={ResultListScreen} />
                  <Route path="/scan-detail/:id" component={ResultScreen} />
                  <Route path="/form" component={ResultSubmitForm} />
                </div>
            </div>
          </Router>
        </SnackbarProvider>
      </Provider>
    );
  }
}

export default App;
