import React, { useState } from 'react'
import { capitalize } from '../lib/helpers'
import { Field, Label, Radio } from '@zendeskgarden/react-forms'
import { Button } from '@zendeskgarden/react-buttons'

const subscribeStatusDateKeyMap = {
  subscribe: 'subscribedAt',
  unsubscribe: 'unsubscribedAt',
}

const SubscriptionStatus = (props) => {
  if (!props.requester) {
    return (<p>No requester email available</p>);
  }

  const [subscribeStatus, setSubscribeStatus] = useState(props.cordialContact
    ? props.cordialContact.channels.email.subscribeStatus
    : null
  )

  // The key for the date changes depending on the status. EG: 'unsubscribedAt' or 'subscribedAt'
  const subscribeStatusDateKey = subscribeStatusDateKeyMap[subscribeStatus];
  const [subscribeStatusDate, setSubscribeStatusDate] = useState(
    subscribeStatusDateKey
      ? new Date(props.cordialContact.channels.email[subscribeStatusDateKey])
      : null
  )

  // This is used for the radio button values
  const [subscribeStatusValue, setRadioValue] = useState(subscribeStatus);

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

    //todo: Start a loader
    props.cordialApi.addOrUpdateContact(email, data)
      .then((data) => {
        if (data && data.success !== true) {
          //todo: show error message
          return;
        }
        //todo: show success message
        setSubscribeStatus(subscribeStatusValue)
        setSubscribeStatusDate(new Date())
      })
      .catch((error) => {
        //todo: show error message
        console.log(error)
      })
      .finally(
        //todo: stop loader
      )

  }

  return (
    <div>
        <h2 className="text-lg font-bold">Subscription Status</h2>
        <div className="mb-4">
          <p className="mb-4">{ subscribeStatus
            ? <span>{capitalize(subscribeStatus)}{subscribeStatusDate && <> on {subscribeStatusDate.toLocaleTimeString()}</>}</span>
            : <span>This email is not in Cordial</span>
          }
          </p>
          <Field>
            <Radio
              name="default example"
              value="subscribed"
              checked={subscribeStatusValue === 'subscribed'}
              onChange={event => setRadioValue(event.target.value)}
            >
              <Label>Subscribed</Label>
            </Radio>
          </Field>
          <Field>
            <Radio
              name="default example"
              value="unsubscribed"
              checked={subscribeStatusValue === 'unsubscribed'}
              onChange={event => setRadioValue(event.target.value)}
            >
              <Label>Unsubscribed</Label>
            </Radio>
          </Field>
          <Field>
            <Radio
              name="default example"
              value="none"
              checked={subscribeStatusValue === 'none'}
              onChange={event => setRadioValue(event.target.value)}
            >
              <Label>None</Label>
            </Radio>
          </Field>
          <div className="mt-4">
            <Button onClick={saveSubscribeStatus}>Save</Button>
          </div>
        </div>
    </div>
  )
}

export default SubscriptionStatus