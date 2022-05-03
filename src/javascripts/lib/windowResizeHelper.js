import { resizeContainer } from './helpers'

class WindowResizeHelper {
  constructor (client, maxHeight) {
    this.client = client
    this.maxHeight = maxHeight
  }

  resize () {
    return resizeContainer(this.client, this.maxHeight)
  }
}

export default WindowResizeHelper
