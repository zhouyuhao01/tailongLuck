import React, { Component } from 'react';
import Webcam from "react-webcam";
import focusImg from '../static/focus.svg'
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
            loadingNumber: 4
        }
    }

    componentDidMount() {
        // this.flow()
        console.log('asdad', window.watchStorage)
        window.watchStorage((e) => {
            const award = window.getStorageAward()
            console.log('award', award)
            console.log('award', e)
            this.startCapture()
        })
    }
    

    componentWillReceiveProps(nextProps) {
        const award = window.getStorageAward()
        // if (nextProps.done === true && this.props.done === false && !award) {
        //     console.log('award', award)
        //     setTimeout(() => this.startCapture(), 6000)
        // }
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
        }, () => this.props.onCapture(imageSrc))
        
    };
    
    

    componentWillUnmount() {
        clearInterval(this.interval)
        clearInterval(this.loadingInterval)
    }

    startCapture = () => {
        this.props.onDone(false, false)
        this.props.onCapture('')
        this.flow()
    }

    flow = () => {
        clearInterval(this.interval)
        clearInterval(this.loadingInterval)
        this.props.disableAward(true)
        this.setState({
            loadingNumber: 4
        }, () => {
            const self = this
            self.loadingInterval = setInterval(() => {
                self.setState({
                    loadingNumber: self.state.loadingNumber - 1
                }, () => {
                    this.props.changeColor(this.state.loadingNumber)
                    if (self.state.loadingNumber === 0) {
                        setTimeout(() => {
                            self.capture()
                        }, 1000)
                        setTimeout(() => {
                            const audio = document.getElementById("camera_audio")
                            audio.play()
                        }, 200)
                            
                        
                        setTimeout(() => {
                            this.setState({loadingNumber: 0})
                            this.props.onDone(true, '')
                            this.props.disableAward(false)
                            this.setState({
                                imageSrc: ''
                            })
                            // this.props.onCapture('')
                        }, 10000)
                        // self.interval = setInterval(() => {
                        //     self.capture()
                        // }, 1000)
                        clearInterval(self.loadingInterval)
                    }
                })
            }, 1000)
            
        })
    }



    render() {
        const videoConstraints = {
            width: 420,
            height: 560,
            facingMode: "user",
        }

        const showImg = this.state.imageSrc && (this.state.loadingNumber <= 0)
        
        return(
            <div style={{}} className={styles + ` color-border-${this.props.color}`}>
                <div 
                    className={"loading-number color-" + this.state.loadingNumber} style={{display: [4,3,2,1].indexOf(this.state.loadingNumber) > -1 ? 'block' : 'none'}}
                >
                    {
                        [3,2,1].indexOf(this.state.loadingNumber) > -1
                        &&
                        <span className="number  animated pulse infinite">{this.state.loadingNumber}</span>
                    }
                    {
                        [4].indexOf(this.state.loadingNumber) > -1
                        &&
                        <span className="prepare animated bounce infinite">准备拍照</span>
                    }
                </div>
                <div style={{
                    // display: this.state.loadingNumber <= 0 ? 'block' : 'none'
                    zIndex: -1
                }}>
                        
                    <img src={this.state.imageSrc} alt="" style={{display: showImg ? 'block' : 'none'}} />
                    <Webcam 
                        style={{margin:"200", display: !showImg ? 'block' : 'none'}}
                        width={420} height={560} 
                        ref={this.setRef}
                        videoConstraints={videoConstraints}
                        screenshotQuality={1}
                        screenshotFormat="image/png" onUserMedia={() => {
                    }} />
                    <img src={focusImg} style={{ display: !showImg && [4,3,2,1].indexOf(this.state.loadingNumber) === -1 ? 'block' : 'none'}} className="focus-img animated pulse infinite" alt=""/>
                </div>
                
                {/* <Button className="capture-btn" type="primary" size='large' onClick={this.startCapture}>拍！</Button> */}
            
                {/*
                    <img width={360} height={270} src={this.state.imageSrc} alt="" />
                */}
            </div>
            )
    }
}

export default Camera;