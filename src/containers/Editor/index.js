import React, { Component } from 'react'
import styles from './index.less'
import Preview from '../Preview'

export default class Editor extends Component {
  render() {
    console.log(this.props)
    return (
      <div className={styles.container}>
        <h1>Preview123</h1>
        <img src={require('./imgs/alone.jpg')} alt="" className="img" />
        <div style={{ padding: '20px' }}>Preview 页面 更改内容</div>
        <Preview/>
      </div>
    )
  }
}
