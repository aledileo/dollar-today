import React from 'react';
import { Router } from '@reach/router';
import DollarTodayPrice from "./DollarTodayPrice";
import './App.scss';

const App = () => {
  return (
    <Router>
      <DollarTodayPrice path='/' />
    </Router>
  );
}

export default App;
