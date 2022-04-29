import React from 'react'
import SubscriptionStatus from './SubscriptionStatus'
import CustomerInfo from './CustomerInfo'
import SubscriberEvents from './SubscriberEvents'

const Main = (props) => {
  const onCordialContactUpdate = () => {
    console.log('cordial contact was updated!')
  }

  return (
    <div className="app">
      <CustomerInfo name={props.requester.name} email={props.requester.email} />
      <SubscriptionStatus requester={props.requester} cordialContact={props.cordialContact} cordialApi={props.cordialApi} onCordialContactUpdate={onCordialContactUpdate} />
      <SubscriberEvents />
    </div>
  )
}

export default Main