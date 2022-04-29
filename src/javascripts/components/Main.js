import React from 'react'
import SubscriptionStatus from './SubscriptionStatus'
import CustomerInfo from './CustomerInfo'

const Main = (props) => {
  return (
    <div className="app">
      <CustomerInfo name={props.requester.name} email={props.requester.email} />
      <SubscriptionStatus requester={props.requester} cordialContact={props.cordialContact} cordialApi={props.cordialApi} />
    </div>
  )
}

export default Main