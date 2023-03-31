import React from 'react'
import {useLocation} from 'react-router-dom'


function Test({walid}) {
    const {state} = useLocation();
    const { id, color } = state; // Read values passed on state
    console.log('walid', id)

  return (
    <div>Test {id} </div>
  )
}

export default Test