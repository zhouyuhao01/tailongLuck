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
            loadingNumber: 3
        }
    }

    setRef = webcam => {
        this.webcam = webcam;
    };

    capture = () => {
        console.log(this.state.loadingNumber, this.props.done)
        if (this.props.done) return 
        const imageSrc = this.webcam.getScreenshot();
        this.setState({
            imageSrc:imageSrc
        })
        this.props.onCapture(imageSrc)
    };
    
    
    componentDidMount() {
        this.flow()
    }

    componentWillUnmount() {
        clearInterval(this.interval)
        clearInterval(this.loadingInterval)
    }

    startCapture = () => {
        this.props.onDone(false, false)
        this.flow()
    }

    flow = () => {
        clearInterval(this.interval)
        clearInterval(this.loadingInterval)
        this.setState({
            loadingNumber: 3
        }, () => {
            const self = this
            self.loadingInterval = setInterval(() => {
                self.setState({
                    loadingNumber: self.state.loadingNumber - 1
                }, () => {
                    if (self.state.loadingNumber === 0) {
                        self.interval = setInterval(() => {
                            self.capture()
                        }, 500)
                        clearInterval(self.loadingInterval)
                    }
                })
            }, 1000)
            
        })
    }



    render() {
        const videoConstraints = {
            width: 480,
            height: 640,
            facingMode: "user",
        }
        
        return(
            <div style={{}} className={styles}>
                <div 
                    className={"loading-number color-" + this.state.loadingNumber} style={{display: this.state.loadingNumber > 0 ? 'block' : 'none'}}
                >{this.state.loadingNumber}</div>
                <div style={{
                    // display: this.state.loadingNumber <= 0 ? 'block' : 'none'
                    zIndex: -1
                }}>
                    {
                        this.props.validImg && (this.state.loadingNumber <= 0)
                        ?
                        <img src={this.props.validImg.src} alt=""/>
                        : 
                        <Webcam 
                            style={{margin:"200"}}
                            width={480} height={640} 
                            ref={this.setRef}
                            videoConstraints={videoConstraints}
                            screenshotQuality={1}
                            screenshotFormat="image/png" onUserMedia={() => {
                        }} />
                        }
                </div>
                
                <Button className="capture-btn" type="primary" size='large' onClick={this.startCapture}>拍！</Button>
            
                {/*
                    <img width={360} height={270} src={this.state.imageSrc} alt="" />
                */}
            </div>
            )
    }
}

export default Camera;