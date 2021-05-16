import React, { Component } from 'react'
import '../styles/appleItem.scss'
import { inject, observer } from 'mobx-react'

@inject('apple')
@observer
class AppleItem extends Component {
  render() {
    const { eatApple } = this.props.apple
    const { id, weight } = this.props.itemApple

    return (
      <div className="appleItem">
        <div className="apple"><img src={require('../images/apple.png')} alt="" /></div>
        <div className="info">
          <div className="name">红苹果 - {id}号</div>
          <div className="weight">{weight}克</div>
        </div>
        <div className="btn-div">
          <button onClick={() => eatApple(id)}> 吃掉 </button>
        </div>
      </div>
    )
  }
}

export default AppleItem