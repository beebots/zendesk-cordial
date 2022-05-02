import { arrayFromMultilineString } from './helpers'

class CordialAttributeHelper {
  allowedContactAttributesKeys;

  constructor (cordialApi, contactAttributesConfig) {
    this.cordialApi = cordialApi
    this.allowedContactAttributesKeys = arrayFromMultilineString(contactAttributesConfig)
  }

  async getAllowedAttributes () {
    const allCordialContactAttributes = (await this.cordialApi.getAllContactAttributes())
    return this.allowedContactAttributesKeys.map(attributeKey => allCordialContactAttributes[attributeKey] ?? false)
  }

}

export default CordialAttributeHelper
