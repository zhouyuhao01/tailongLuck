import React, { Component } from 'react';
import logo from './static/logo.png';
import line1Img from './static/line_left.png';
import line2Img from './static/line_right.png';
import './App.scss';
import Camera from './Camera'
import Center from './Center'
import Result from './Result'
class App extends Component {
  constructor() {
    super()
    this.state = {
      imgUrl: '',
      done: false,
      color: 1,
    }
  }
  componentDidMount() {
    const self = this
    window.addEventListener('reset', () => {
      self.setState({
        imgUrl: '',
        done: false,
        color: 1,
      })
    }, false)
  }
  
  render() {
    return (
      <div className="main">
        <img src={logo} alt="" className="logo  animated pulse infinite"/>
        <div className="camera-sec">
            
          <Camera 
            validImg={this.state.validImg}
            imgUrl={this.state.imgUrl}
            done={this.state.done}
            onCapture={(imgUrl) => this.setState({imgUrl})}
            onDone={(done, validImg) => this.setState({done, validImg})}
            disableAward={disableAward => this.setState({disableAward})}
            color={this.state.color}
            changeColor={(color) => this.setState({color})}
          ></Camera>
          
          {/* <img src={line1Img} alt=""/>
          <Center imgUrl={this.state.imgUrl}></Center>
          <img src={line2Img} alt=""/> */}
          {/* <div className="led-sec">
            <div className="bulb bulb-green" style={{top: "145px"}}></div>
            <div className="bulb bulb-purple" style={{top: "244px"}}></div>
            <div className="bulb bulb-red" style={{top: "343px"}}></div>
          </div> */}
          <Result disableAward={this.state.disableAward} imgUrl={this.state.imgUrl} done={this.state.done} onDone={(done, validImg) => this.setState({done, validImg})}></Result>
        </div>
      </div>
    );
  }
}

export default App;
