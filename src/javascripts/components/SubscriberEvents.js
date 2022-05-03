import React, { useEffect, useState } from 'react'
import { LG, MD, UnorderedList } from '@zendeskgarden/react-typography'
import { Dots } from '@zendeskgarden/react-loaders'

const SubscriberEvents = (props) => {
  const [isLoading, setIsLoading] = useState(true)
  const [events, setEvents] = useState([])

  useEffect(() => {
    props.cordialApi.getEventsByContact(props.email, 5)
      .then((response) => {
        setIsLoading(false)
        setEvents(response.data.map((eventData) => {
          return {
            action: eventData.action,
            time: new Date(eventData.time)
          }
        }))
        props.resizeHelper.resize()
      })
      .catch((error) => {
        setIsLoading(false)
        console.log(error)
      })
  }, [props.email, props.cordialContact]) // Only run use effect if one of these change

  return (
    <div className="mb-4">
      <LG tag="h2" isBold>
        Recent Events
        { isLoading &&
          <Dots />
        }
      </LG>
      <UnorderedList>
        { events.map((event, index) => {
          return <UnorderedList.Item key={index}>
            <MD isBold>{event.action}</MD>
            <MD>{event.time.toLocaleDateString()}, {event.time.toLocaleTimeString()}</MD>
          </UnorderedList.Item>
          })
        }
      </UnorderedList>
    </div>
  )
}

export default SubscriberEvents