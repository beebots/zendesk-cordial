import { resizeContainer } from '../lib/helpers'
import React from 'react'
import ReactDOM from 'react-dom'
import Main from '../components/Main'
import CordialApi from '../lib/cordialApi'

const MAX_HEIGHT = 1000

class App {
  constructor (client, appData) {
    this.client = client
    this.cordialApi = new CordialApi(client, appData.metadata.settings.api_url)
    this.appData = appData

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
    let cordialContact = null
    try {
      cordialContact = (await this.cordialApi.getContact(ticketRequester.email))
    } catch (exception) {
      if (exception.status !== 404) {
        console.log('Error while getting a Cordial contact', exception)
      }
    }
    // render application markup
    ReactDOM.render(<Main requester={ticketRequester} cordialContact={cordialContact} cordialApi={this.cordialApi} />, document.getElementById('main'))
    return resizeContainer(this.client, MAX_HEIGHT)
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
