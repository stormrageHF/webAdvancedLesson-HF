import React from 'react'
import { connect } from 'react-redux'
import * as modalActions from '../store/actions/modal.actions'
import { bindActionCreators } from 'redux'


function Modal({ showState, show, hide, show_async }) {
  const styles = {
    width: 400,
    height: 400,
    position: 'absolute',
    top: '50%',
    left: '50%',
    backgroundColor: 'blue',
    display: showState ? 'block' : 'none'
  }

  return <div>
    <button onClick={show_async}>show</button>
    <button onClick={hide}>hide</button>
    <div style={styles}></div>
  </div>
}

const mapStateToProps = state => {
  return {
    showState: state.modal.showState
  }
}

const mapActionsToProps = dispatch => bindActionCreators(modalActions, dispatch)

export default connect(mapStateToProps, mapActionsToProps)(Modal)