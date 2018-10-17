import React, { Component } from 'react';
import logo from './logo.svg';
import { Row, Col } from 'antd';
import './App.css';
import Camera from './camera/Camera'

class App extends Component {

  render() {
    return (
      <div >
        <Camera width={500} height={500} ></Camera>
      </div>
    );
  }
}

export default App;
