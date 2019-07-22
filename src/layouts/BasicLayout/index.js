import React from 'react'
import { withRouter } from 'react-router-dom'

import styles from './index.less'

class BasicLayout extends React.PureComponent {
  render() {
    return (
      <div className={styles.main}>
        <div className={styles.content}>{this.props.children}</div>
      </div>
    )
  }
}

export default withRouter(BasicLayout)
