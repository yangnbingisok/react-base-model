import React, { Component } from 'react'
import styles from './index.less'
import { connect } from 'react-redux'
@connect(({editor}) => ({
  editor,
}))
class Preview extends Component {
  render() {
    console.log(this.props)
    return (
      <div className={styles.container}>
        <h1>Preview</h1>
        <img src={require('./imgs/alone.jpg')} alt="" className="img" />
        <div style={{ padding: '20px' }}>Preview 页面 更改内容</div>
      </div>
    )
  }
}
export default Preview
