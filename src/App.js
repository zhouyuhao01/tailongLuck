import React, { Component } from 'react';
import logo from './logo.svg';
import { Row, Col } from 'antd';
import './App.css';
import Camera from './camera/Camera'

class App extends Component {

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
