import React, { useEffect, useState } from 'react'
import SubscriptionStatus from './SubscriptionStatus'
import CustomerInfo from './CustomerInfo'
import SubscriberEvents from './SubscriberEvents'
import { Paragraph } from '@zendeskgarden/react-typography'

const Main = (props) => {
  if (!props.requester.email) {
    return (<p>No requester email available on the ticket</p>);
  }

  const [cordialContact, setCordialContact] = useState(null)

  function updateContactData(){
    props.cordialApi.getContact(props.requester.email)
      .then((data) => {
        setCordialContact(data)
      })
      .catch((error) => {
        if (error.status !== 404) {
          console.log('Error while getting a Cordial contact', error)
        }
      })
  }

  const onCordialContactUpdate = () => {
    updateContactData()
  }

  useEffect(() => {
    updateContactData()
  }, [props.requester.email])

  return cordialContact !== null
    ? (
      <div className="app">
        <CustomerInfo
          email={props.requester.email}
          cordialContact={cordialContact}
          cordialApi={props.cordialApi}
          allowedContactAttributes={props.allowedContactAttributes}
          onCordialContactUpdate={onCordialContactUpdate}
          resizeHelper={props.windowResizeHelper}
        />
        <SubscriptionStatus
          email={props.requester.email}
          cordialContact={cordialContact}
          cordialApi={props.cordialApi}
          onCordialContactUpdate={onCordialContactUpdate}
          resizeHelper={props.windowResizeHelper}
        />
        <SubscriberEvents
          email={props.requester.email}
          cordialApi={props.cordialApi}
          cordialContact={cordialContact}
          resizeHelper={props.windowResizeHelper}
        />
      </div>
  )
  : (
    <Paragraph>No Cordial Data Available</Paragraph>
  )
}

export default Main