import { arrayFromMultilineString } from './helpers'

const auth_headers = {
  "Authorization": "Basic {{setting.api_token}}",
  "Accept": "application/json"
}

class CordialApi {
  client;
  apiUrl;
  apiUrlContact;
  contactAttributes;

  constructor (client, apiUrl, contactAttributesConfig) {
    this.client = client
    this.apiUrl = `${apiUrl}/v2`
    this.apiUrlContact = `${this.apiUrl}/contacts`
    this.contactAttributes = arrayFromMultilineString(contactAttributesConfig)
  };

  async getContact (email) {
    const encodedEmail = encodeURIComponent(email.toLowerCase());
    const settings = {
      url: `${this.apiUrlContact}/email:${encodedEmail}`,
      headers: auth_headers,
      secure: true,
      type: 'GET'
    };

    return (await this.client.request(settings))
  }

  async updateContact (email, data) {
    const encodedEmail = encodeURIComponent(email.toLowerCase());
    const settings = {
      url: `${this.apiUrlContact}/email:${encodedEmail}`,
      headers: auth_headers,
      data: data,
      secure: true,
      type: 'PUT'
    };
    return (await this.client.request(settings))
  }

  async createContact (email, data) {
    const settings = {
      url: this.apiUrlContact,
      headers: auth_headers,
      data: data,
      secure: true,
      type: 'POST'
    };
    return (await this.client.request(settings))
  }

  async addOrUpdateContact (email, data) {
    try {
      return (await this.updateContact(email, data))
    } catch (exception){
      if (exception?.responseJSON?.errorKey === 'CONTACTS_CONTACT_NOT_FOUND') {
        return (await this.createContact(email, data))
      }
      console.log('Something went wrong: ', exception)
    }
  }
}

export default CordialApi
