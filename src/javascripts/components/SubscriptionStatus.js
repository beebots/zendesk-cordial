import React from 'react'

const SubscriptionStatus = () => {
  return (
    <div>
      <div className="info-block">
        <div className="block-title">
          <h2>Subscription Status</h2>
        </div>
        <div className="block-content">
          <p>Subscribed on 3/22/2022</p>
          <div>
            <input type="checkbox" id="js-subscribed"/>
            <label htmlFor="js-subscribed">Subscribed</label>
          </div>

          <div>
            <input type="checkbox" id="js-unsubscribed" checked/>
            <label htmlFor="js-subscribed">Unsubscribed</label>
          </div>

          <div>
            <button id="js-submit" className="js-submit-subscription-status">Update</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubscriptionStatus