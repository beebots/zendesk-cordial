import React, { useLayoutEffect, useState } from 'react'
import { capitalize } from '../lib/helpers'
import PencilIcon from '@zendeskgarden/svg-icons/src/16/pencil-stroke.svg'
import { Field, Label, Radio } from '@zendeskgarden/react-forms'
import { Button, IconButton } from '@zendeskgarden/react-buttons'
import { Dots } from '@zendeskgarden/react-loaders'
import { Alert, Close, Title } from '@zendeskgarden/react-notifications'
import { LG } from '@zendeskgarden/react-typography'

const subscribeStatusDateKeyMap = {
  subscribed: 'subscribedAt',
  unsubscribed: 'unsubscribedAt',
}

const SUBSCRIBED = 'subscribed'
const UNSUBSCRIBED = 'unsubscribed'
const NONE = 'none'

const SubscriptionStatus = (props) => {
  const [subscribeStatus, setSubscribeStatus] = useState(props.cordialContact
    ? props.cordialContact.channels.email.subscribeStatus
    : null
  )

  // The key for the date changes depending on the status. Example: 'unsubscribedAt' or 'subscribedAt'
  const subscribeStatusDateKey = subscribeStatusDateKeyMap[subscribeStatus]
  const [subscribeStatusDate, setSubscribeStatusDate] = useState(
    subscribeStatusDateKey
      ? new Date(props.cordialContact.channels.email[subscribeStatusDateKey])
      : null
  )

  // This is used for the radio button values
  const [subscribeStatusValue, setRadioValue] = useState(subscribeStatus)

  const [isLoading, setIsLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [messages, setMessages] = useState([])

  useLayoutEffect(() => {
    props.resizeHelper.resize()
  })

  const saveSubscribeStatus = () => {
    if (!props.email) {
      return
    }
    const email = props.email.toLowerCase()
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
        setIsEditing(false)
        props.onCordialContactUpdate()
      })
      .catch((error) => {
        setIsLoading(false)
        setMessages([{type: 'error', title: 'Hmmm. =/', value: 'There was a problem communicating with Cordial'}])
        console.log(error)
      })
  }

  function toggleEdit(){
    if (isEditing) {
      setIsEditing(false)
      return
    }
    setIsEditing(true)
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
      <LG tag="h2" isBold>
        Subscription Status
        {' '}
        <IconButton onClick={toggleEdit} aria-label="Edit">
          <PencilIcon />
        </IconButton>
      </LG>
        <div className="mb-4">
          <p className="mb-4">{ subscribeStatus
            ? <span>{capitalize(subscribeStatus)}{subscribeStatusDate && <> on {subscribeStatusDate.toLocaleDateString()} at {subscribeStatusDate.toLocaleTimeString()}</>}</span>
            : <span>This email is not in Cordial</span>
          }
          </p>
          { isEditing &&
            <div>
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
                    : <span>Save</span>
                  }
                </Button>
                {' '}
                <Button isBasic onClick={toggleEdit}>Cancel</Button>
              </div>
            </div>
          }
        </div>
    </div>
  )
}

export default SubscriptionStatus