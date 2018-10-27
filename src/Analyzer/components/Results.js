import React from 'react'
import { format } from 'd3-format'
import chickImg from '../../static/chick-2.jpg'
import Message from './Message'

const fmt = (x, digits = 1) => format(`.${digits}%`)(x)

const Summary = ({ total, happy }) => (
  <Message bg="yellow">
    <strong>Results:</strong> Of <strong>{total}</strong>{' '}
    {total > 1 ? 'people' : 'person'} detected,{' '}
    <strong>
      {happy} ({fmt(happy / total, 0)})
    </strong>{' '}
    {happy === 1 ? 'is' : 'are'} happy.
  </Message>
)
const colorList = ['red', 'green', 'purple', ]
const Results = ({ faces, emotions }) => (
  <div styles={{marginTop: "-177px", marginLeft: "-15px"}}>
  {/* <div > */}
    {/* <Summary
      total={faces.length}
      happy={emotions.filter(r => r[0].label.emoji === '😄').length}
    /> */}
    <div className="result-img-sec">
      {faces.map((face, i) => (
        <div key={i} >
          <img
            src={face ? face.toDataURL() : chickImg}
            alt={`face ${i + 1}`}
            className="block col-12"
          />
          <div className="detail-sec">
            {emotions[i].slice(0, 3).map(({ label, value }, index) => (
              <div key={index} >
                <div>
                  {label ? label.emoji : '😐'} <span>   </span>
                  {label ? label.name : ''}
                </div>
                <div className="status-meter">
                  <span>{value ? fmt(value) : '0%'}</span>
                  <div className={"meter-value " +  colorList[index]} style={{width: value ? fmt(value) : '0%'}}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
)

export default Results
