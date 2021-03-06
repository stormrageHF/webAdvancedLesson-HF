import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as counterActions from '../store/actions/counter.actions'


function Counter({ count, increment, decrement, increment_async }) {
  return <div>
    <button onClick={() => increment(10)}>+</button>
    <span>{count}</span>
    <button onClick={() => decrement(10)}>-</button>
  </div>
}

const mapStateToProps = state => ({
  count: state.counter.count
})

const mapDispatchToProps = dispath => bindActionCreators(counterActions, dispath)

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
