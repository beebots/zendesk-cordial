import { resizeContainer } from '../lib/helpers'
import React from 'react'
import ReactDOM from 'react-dom'
import Main from '../components/Main'

const MAX_HEIGHT = 1000

class App {
  constructor (client, appData) {
    this._client = client

    // this.initializePromise is only used in testing
    // indicate app initilization(including all async operations) is complete
    this.initializePromise = this.init()
  }

  /**
   * Initialize module, render main template
   */
  async init () {
    const ticketRequester = (await this._client.get('ticket.requester'))
    if (ticketRequester && this._client) {
      // render application markup
        ReactDOM.render(<Main client={this._client} />, document.getElementById('main'))
      return resizeContainer(this._client, MAX_HEIGHT)
    }
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
