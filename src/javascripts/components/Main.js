import React from 'react'
import SubscriptionStatus from './SubscriptionStatus'

const Main = (props) => {
  return (
    <div className="App">
      <div className="info-block">
        <div className="block-title">
          <h2>Customer Info</h2>
        </div>
        <div className="block-content">
          <p>{props.requester ? props.requester.name : ''}</p>
          <p>{props.requester ? props.requester.email : ''}</p>
        </div>
      </div>
      <SubscriptionStatus requester={props.requester} />
    </div>
  )
}

export default Main