import React, { Component } from 'react';
import Webcam from "react-webcam";
import { Button } from 'antd'
import { styles } from './index.scss'
// import {Row, Col} from "antd";


/**
 * 拍照页面
 */
class Camera extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imageSrc:"",
        }
    }

    setRef = webcam => {
        this.webcam = webcam;
    };

    capture = () => {
        if (this.props.done) return
        const imageSrc = this.webcam.getScreenshot();
        this.setState({
            imageSrc:imageSrc
        })
        this.props.onCapture(imageSrc)
    };
    
    
    componentDidMount() {
        const self = this
        this.interval = setInterval(() => {
            self.capture()
        }, 500)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }
    


    render() {
        const videoConstraints = {
            width: 480,
            height: 640,
            facingMode: "user",
        }
        return(
            <div style={{}} className={styles}>
                <div>
                    <Webcam 
                        style={{margin:"200"}}
                        width={480} height={640} 
                        ref={this.setRef}
                        videoConstraints={videoConstraints}
                        screenshotQuality={1}
                        screenshotFormat="image/png" onUserMedia={() => {
                    }} />
                    {/* <Button className="capture-btn" type="primary" size='large' onClick={this.capture}>拍！</Button> */}
                </div>
                {/*
                    <img width={360} height={270} src={this.state.imageSrc} alt="" />
                */}
            </div>
            )
    }
}

export default Camera;