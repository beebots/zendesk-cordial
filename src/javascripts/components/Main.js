import React from 'react'
import SubscriptionStatus from './SubscriptionStatus'

const Main = (props) => {
  const [requester, setRequester] = React.useState(null)

  React.useEffect(async () => {
    const data = await props.client.get('ticket.requester')
    const requester = data['ticket.requester']
    setRequester(requester)
  }, [])

  return (
    <div className="App">
      <div className="info-block">
        <div className="block-title">
          <h2>Customer Info</h2>
        </div>
        <div className="block-content">
          <p>{requester ? requester.name : ''}</p>
          <p>{requester ? requester.email : ''}</p>
        </div>
      </div>

      <SubscriptionStatus requester={requester} />

    </div>
  )
}

export default Main