import React, { Component } from 'react';
import logo from './logo.svg';
import { Row, Col } from 'antd';
import './App.css';
import Camera from './camera/Camera'

class App extends Component {

  getMedia() {
    let constraints = {
        video: {width: 500, height: 500},
        audio: true
    };
    let video = document.getElementById("video");
    let promise = navigator.mediaDevices.getUserMedia(constraints);
    promise.then(function (MediaStream) {
        video.srcObject = MediaStream;
        video.play();
    });
  }

  takePhoto() {
    let video = document.getElementById("video");
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, 500, 500);
  }

  render() {
    return (
      <div >
        <Row gutter={16}>
          <Col className="gutter-row" span={6}>
            <div className="gutter-box">col-6</div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div className="gutter-box">col-6</div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div className="gutter-box">col-6</div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div className="gutter-box">col-6</div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
