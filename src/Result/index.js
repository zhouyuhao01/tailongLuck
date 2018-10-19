import React, { Component } from 'react'
import { styles } from './index.scss'
import Analyzer from '../Analyzer'

export default class Result extends Component {
  
  render() {
    return (
      <div className={styles}>
        <Analyzer {...this.props}></Analyzer>
      </div>
    )
  }
}
