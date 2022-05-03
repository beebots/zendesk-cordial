import React from 'react'
import SubscriptionStatus from './SubscriptionStatus'
import CustomerInfo from './CustomerInfo'
import SubscriberEvents from './SubscriberEvents'

const Main = (props) => {
  if (!props.requester.email) {
    return (<p>No requester email available on the ticket</p>);
  }

  const onCordialContactUpdate = () => {
    console.log('cordial contact was updated!')
  }

  return (
    <div className="app">
      <CustomerInfo
        name={props.requester.name}
        email={props.requester.email}
        cordialContact={props.cordialContact}
        cordialApi={props.cordialApi}
        allowedContactAttributes={props.allowedContactAttributes}
        onCordialContactUpdate={onCordialContactUpdate}
      />
      <SubscriptionStatus
        email={props.requester.email}
        cordialContact={props.cordialContact}
        cordialApi={props.cordialApi}
        onCordialContactUpdate={onCordialContactUpdate}
      />
      <SubscriberEvents
        email={props.requester.email}
        cordialApi={props.cordialApi}
        cordialContact={props.cordialContact}
      />
    </div>
  )
}

export default Main