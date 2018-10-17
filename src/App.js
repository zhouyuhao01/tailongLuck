import React, { Component } from 'react';
import logo from './static/logo.svg';
import line1Img from './static/line_left.png';
import line2Img from './static/line_right.png';
import './App.scss';
import Camera from './Camera'
import Center from './Center'
import Result from './Result'

class App extends Component {
  render() {
    return (
      <div className="main">
        <img src={logo} alt="" className="logo"/>
        <div className="camera-sec">
          <Camera width={500} height={500} ></Camera>
          <img src={line1Img} alt=""/>
          <Center></Center>
          <img src={line2Img} alt=""/>
          <div className="led-sec">
            <div className="bulb bulb-green" style={{top: "145px"}}></div>
            <div className="bulb bulb-purple" style={{top: "244px"}}></div>
            <div className="bulb bulb-red" style={{top: "343px"}}></div>
          </div>
          <Result></Result>
        </div>
      </div>
    );
  }
}

export default App;
