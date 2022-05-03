import React, { useEffect, useState } from 'react'
import SubscriptionStatus from './SubscriptionStatus'
import CustomerInfo from './CustomerInfo'
import SubscriberEvents from './SubscriberEvents'
import { Paragraph } from '@zendeskgarden/react-typography'
import { Spinner } from '@zendeskgarden/react-loaders'
import { Col, Row } from '@zendeskgarden/react-grid'

const Main = (props) => {
  if (!props.requester.email) {
    return (<p>No requester email available on the ticket</p>);
  }

  const [cordialContact, setCordialContact] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  function updateContactData(){
    props.cordialApi.getContact(props.requester.email)
      .then((data) => {
        setIsLoading(false)
        setCordialContact(data)
      })
      .catch((error) => {
        setIsLoading(false)
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

  if (isLoading) {
    return (
      <Row alignItems="center">
        <Col textAlign="center">
          <Spinner className="loader" size="32" />
        </Col>
      </Row>
    )
  }

  if (cordialContact === null) {
    return (
      <Paragraph>No Cordial Data Available</Paragraph>
    )
  }

  return (
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
        {props.appData.metadata.settings.enable_events &&
          <SubscriberEvents
            email={props.requester.email}
            cordialApi={props.cordialApi}
            cordialContact={cordialContact}
            resizeHelper={props.windowResizeHelper}
          />
        }
      </div>
  )
}

export default Main