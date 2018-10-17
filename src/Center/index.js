import React, { Component } from 'react'
import _ from 'lodash'
import { styles } from './index.scss'

const emotionList = [
  {
    emotion: 'happy',
    color: 'green',
  },
  {
    emotion: 'neutral',
    color: 'purple',
  },
  {
    emotion: 'angry',
    color: 'red',
  }
]

class Center extends Component {
  constructor(props) {
    super(props)
    this.state = {
      happy: 0.5,
      neutral: 0.2,
      angry: 0.3,
    }
    setInterval(() => {
      this.setState({
        happy: _.random(),
        neutral: _.random(),
        angry: _.random(),
      })
    }, .2)
  }
  render() {
    return (
      <div className={styles}>
        {
          emotionList.map(emotion => (
            <div className={"color-block " + emotion.color} key={emotion.emotion}>
              <div className="examples-sec">
                <p>0 Examples</p>
                <div className="examples-block"></div>
              </div>
              <div className="status-sec">
                <p>Confidence</p>
                <div className="status-meter">
                  <div className="meter-value" style={{
                    width: (this.state[emotion.emotion] || 0) * 100 + '%'
                  }}></div>
                </div>
                <div className="status-info"> 
                  {
                    emotion.emotion === 'happy'
                    ?
                    <span><span className="emoji" role="img" aria-label="happy">😃</span>  - 开心</span>
                    :
                    emotion.emotion === 'neutral'
                    ?
                    <span><span className="emoji" role="img" aria-label="neutral">😳</span>  - 淡然</span>
                    :
                    <span><span className="emoji" role="img" aria-label="angry">😠 </span>  - 生气</span>
                  }
                </div>
                
              </div>
            </div>
          ))
        }
      </div>
    )
  }
}

export default Center;