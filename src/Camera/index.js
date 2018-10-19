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
        const imageSrc = this.webcam.getScreenshot();
        this.setState({
            imageSrc:imageSrc
        })
        this.props.onCapture(imageSrc)
    };
    
    
    componentDidMount() {
        
    }


    render() {
        return(
            <div style={{}} className={styles}>
                <div>
                    <Webcam 
                        style={{margin:"200"}}
                        width={640} height={480} 
                        ref={this.setRef}
                        screenshotFormat="image/png" onUserMedia={() => {
                    }} />
                    <Button className="capture-btn" type="primary" size='large' onClick={this.capture}>拍！</Button>
                </div>
                {/*
                    <img width={360} height={270} src={this.state.imageSrc} alt="" />
                */}
            </div>
            )
    }
}

export default Camera;