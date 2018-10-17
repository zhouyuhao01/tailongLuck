import React, { Component } from 'react';
import Webcam from "react-webcam";
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
    };
    
    
    componentDidMount() {
        
    }


    render() {
        return(
            <div style={{display:"flex"}} >
                {/* <Row>
                    <Col span={6}> 
                        
                    </Col>
                </Row> */}
                <div>
                    <Webcam 
                        style={{margin:"200"}}
                        width={200} height={200} 
                        ref={this.setRef}
                        screenshotFormat="image/jpg" onUserMedia={() => {
                    }} />
                    <button onClick={this.capture}>Capture photo</button>
                </div>
                
                <img width={600} height={600} src={this.state.imageSrc} />
                
            </div>
            )
    }
}

export default Camera;