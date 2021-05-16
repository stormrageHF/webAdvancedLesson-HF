import React, { Component } from 'react'
import '../styles/appleBasket.scss'
import { inject, observer } from 'mobx-react'
import apple from '../stores/AppleStore'
import AppleItem from './AppleItem'

@inject('apple')
@observer
class AppleBusket extends Component {
  getAppleItem() {
    let data = []

    const { apples } = this.props.apple
    data = apples.filter(apple => apple.isEaten === false).map(apple => <AppleItem itemApple={apple} key={apple.id} />)

    if (!data.length) {
      data.push(<div className='empty-tip' key='empty'>苹果篮子空空如也</div>)
    }

    return data
  }

  render() {
    const { isPicking, buttonText, pickApple, status } = this.props.apple
    const { nowApples, eatenApples } = status
    return (
      <div className="appleBusket">
        <div className="title">苹果篮子</div>

        <div className="stats">
          <div className="section">
            <div className="head">当前</div>
            <div className="content">{nowApples.quantity}个苹果，{nowApples.weight}克
                  </div>
          </div>
          <div className="section">
            <div className="head">已吃掉</div>
            <div className="content">{eatenApples.quantity}个苹果，{eatenApples.weight}克</div>
          </div>
        </div>

        <div className="appleList">
          {this.getAppleItem()}
        </div>

        <div className="btn-div">
          <button className={isPicking ? 'disabled' : ''} onClick={() => pickApple()}>{buttonText}</button>
        </div>
      </div>
    )
  }
}

export default AppleBusket