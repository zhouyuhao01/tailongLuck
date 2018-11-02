import React, { Component } from 'react'
import { styles } from './index.scss'
import Analyzer from '../Analyzer'
import MagicWand from '../MagicWand'
import MagicTail from '../MagicTail'
import _ from 'lodash'

export default class Result extends Component {
  constructor(){
    super()
    this.state = {
      orderList: [1,2,3,4,5,6,7],
      showWand: false
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.done !== this.props.done) {
      this.setState({
        orderList: _.shuffle(this.state.orderList)
      })
    }
    if ((nextProps.imgUrl !== this.props.imgUrl) && nextProps.imgUrl) {
      this.setState({
        showWand: true
      }, () => {
        setTimeout(() => {
          this.setState({
            showWand: false,
          })
        }, 3000)
      })
    }
  }
  
  render() {
    return (
      <div className={styles}>
        <Analyzer {...this.props}></Analyzer>
        {
          false//this.state.showWand
          &&
          <MagicWand></MagicWand>
        }
        {
          this.state.showWand
          &&
          <MagicTail></MagicTail>
        }

        <div className="award-btn-sec">
          {
            this.state.orderList.map((item, index) => (
              <div className={"award-" + item + ' animated pulse infinite'} key={index} onClick={() => !this.props.disableAward && window.setStorageAward(index + 1)}></div>
            ))
          }
        </div>
      </div>
    )
  }
}
