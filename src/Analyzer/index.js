import React, { Component } from 'react';
import { styles } from './index.scss'
import App from './components/App'
export default class Analyzer extends Component {
  render() {
    return (<App {...this.props} className={styles}></App>)
  }
}
