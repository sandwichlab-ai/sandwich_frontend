import React from'react';
import HomePage from './HomePage';
import Auth from './Auth';
import './App.css';
import { Amplify } from 'aws-amplify';
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);

function App() {
  return (
    <div className="App">
        {/* <HomePage /> */}
        <Auth />
    </div>
  );
}

export default App;
