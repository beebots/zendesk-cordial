import React from 'react'
import SubscriptionStatus from './SubscriptionStatus'

const Main = (props) => {
  return (
    <div className="App">
      <div className="mb-4">
        <h2 className="text-lg font-bold">Customer Info</h2>
        <p>{props.requester ? props.requester.name : ''}</p>
        <p>{props.requester ? props.requester.email : ''}</p>
      </div>
      <SubscriptionStatus requester={props.requester} cordialContact={props.cordialContact} cordialApi={props.cordialApi} />
    </div>
  )
}

export default Main