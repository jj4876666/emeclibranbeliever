import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Calculator from './components/Calculator';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/calculator" component={Calculator} />
      </Switch>
    </Router>
  );
};

export default App;