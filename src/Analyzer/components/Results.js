import React from 'react'
import { format } from 'd3-format'

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
          <div >
            <img
              src={face.toDataURL()}
              alt={`face ${i + 1}`}
              className="block col-12"
            />
            <div>
              {emotions[i].slice(0, 2).map(({ label, value }) => (
                <div key={label.name} >
                  <div>
                    {label.emoji}
                    {label.name}
                  </div>
                  <div>{fmt(value)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)

export default Results
