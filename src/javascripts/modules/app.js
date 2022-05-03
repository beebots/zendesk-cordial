import React from 'react'
import ReactDOM from 'react-dom'
import Main from '../components/Main'
import CordialApi from '../lib/cordialApi'
import CordialAttributeHelper from '../lib/cordialAttributeHelper'
import WindowResizeHelper from '../lib/windowResizeHelper'

const MAX_HEIGHT = 1000

class App {
  constructor (client, appData) {
    this.client = client
    this.appData = appData
    this.cordialApi = new CordialApi(client, appData.metadata.settings.api_url, this.allowedContactAttributes)
    this.cordialAttributeHelper = new CordialAttributeHelper(this.cordialApi, appData.metadata.settings.allowed_contact_attributes)
    this.windowResizeHelper = new WindowResizeHelper(client, MAX_HEIGHT)

    // this.initializePromise is only used in testing
    // indicate app initialization(including all async operations) is complete
    this.initializePromise = this.init()
  }

  /**
   * Initialize module, render main template
   */
  async init () {
    const ticketRequesterData = (await this.client.get('ticket.requester'))
    if (ticketRequesterData === undefined
      || ticketRequesterData['ticket.requester'] === undefined) {
      throw new Error('There was an error getting the ticket requester information')
    }

    const ticketRequester = ticketRequesterData['ticket.requester']

    this.allowedContactAttributes = (await this.cordialAttributeHelper.getAllowedAttributes())
    ReactDOM.render(
      <Main
        requester={ticketRequester}
        cordialApi={this.cordialApi}
        allowedContactAttributes={this.allowedContactAttributes}
        windowResizeHelper={this.windowResizeHelper}
        appData={this.appData}
      />,
      document.getElementById('main')
    )
  }

  /**
   * Handle error
   * @param {Object} error error object
   */
  _handleError (error) {
    console.log('Error: ', error.message)
  }
}

export default App
