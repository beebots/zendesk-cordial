import React, { useState } from 'react'
import { capitalize } from '../lib/helpers'
import { Field, Label, Radio } from '@zendeskgarden/react-forms'
import { Button } from '@zendeskgarden/react-buttons'
import { Dots } from '@zendeskgarden/react-loaders'
import { Alert, Close, Title } from '@zendeskgarden/react-notifications'
import { LG } from '@zendeskgarden/react-typography'

const subscribeStatusDateKeyMap = {
  subscribe: 'subscribedAt',
  unsubscribe: 'unsubscribedAt',
}

const SUBSCRIBED = 'subscribed'
const UNSUBSCRIBED = 'unsubscribed'
const NONE = 'none'

const SubscriptionStatus = (props) => {
  if (!props.requester) {
    return (<p>No requester email available</p>);
  }

  const [subscribeStatus, setSubscribeStatus] = useState(props.cordialContact
    ? props.cordialContact.channels.email.subscribeStatus
    : null
  )

  // The key for the date changes depending on the status. EG: 'unsubscribedAt' or 'subscribedAt'
  const subscribeStatusDateKey = subscribeStatusDateKeyMap[subscribeStatus]
  const [subscribeStatusDate, setSubscribeStatusDate] = useState(
    subscribeStatusDateKey
      ? new Date(props.cordialContact.channels.email[subscribeStatusDateKey])
      : null
  )

  // This is used for the radio button values
  const [subscribeStatusValue, setRadioValue] = useState(subscribeStatus)

  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState([])

  const saveSubscribeStatus = () => {
    if (!props.requester.email) {
      return
    }
    const email = props.requester.email.toLowerCase()
    const data = {
      channels: {
        email: {
          address: email,
          subscribeStatus: subscribeStatusValue,
        }
      },
      forceSubscribe: true
    }

    setIsLoading(true)
    props.cordialApi.addOrUpdateContact(email, data)
      .then((data) => {
        setIsLoading(false)
        if (data && data.success !== true) {
          setMessages([{type: 'error', title: 'Uh oh!', value: 'There was a problem communicating with Cordial'}])
          return;
        }
        setMessages([])
        setSubscribeStatus(subscribeStatusValue)
        let statusDate = null
        if (subscribeStatusValue === SUBSCRIBED
          || subscribeStatusValue === UNSUBSCRIBED) {
          statusDate = new Date()
        }
        setSubscribeStatusDate(statusDate)
        props.onCordialContactUpdate()
      })
      .catch((error) => {
        setIsLoading(false)
        setMessages([{type: 'error', title: 'Hmmm. =/', value: 'There was a problem communicating with Cordial'}])
        console.log(error)
      })
  }

  return (
    <div>
      { messages.map((message, index) =>
        <Alert key={index} className="my-1" type={message.type}>
          <Title>{message.title}</Title>
          {message.value}
          <Close aria-label="Close Alert" />
        </Alert>
      )}
      <LG tag="h2" isBold>Subscription Status</LG>
        <div className="mb-4">
          <p className="mb-4">{ subscribeStatus
            ? <span>{capitalize(subscribeStatus)}{subscribeStatusDate && <> on {subscribeStatusDate.toLocaleTimeString()}</>}</span>
            : <span>This email is not in Cordial</span>
          }
          </p>
          <Field>
            <Radio
              name="default example"
              value={SUBSCRIBED}
              checked={subscribeStatusValue === SUBSCRIBED}
              onChange={event => setRadioValue(event.target.value)}
            >
              <Label>Subscribed</Label>
            </Radio>
          </Field>
          <Field>
            <Radio
              name="default example"
              value={UNSUBSCRIBED}
              checked={subscribeStatusValue === UNSUBSCRIBED}
              onChange={event => setRadioValue(event.target.value)}
            >
              <Label>Unsubscribed</Label>
            </Radio>
          </Field>
          <Field>
            <Radio
              name="default example"
              value={NONE}
              checked={subscribeStatusValue === NONE}
              onChange={event => setRadioValue(event.target.value)}
            >
              <Label>None</Label>
            </Radio>
          </Field>
          <div className="mt-4">
            <Button onClick={saveSubscribeStatus}>
              { isLoading
                ? <span>Saving <Dots /></span>
                : <>Save</>
              }
            </Button>
          </div>
        </div>
    </div>
  )
}

export default SubscriptionStatus