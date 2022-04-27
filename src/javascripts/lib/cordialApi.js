const API_URL_BASE = 'https://api.usw2.cordial.io/v2' //TODO : pull from settings
const API_URL_CONTACT = `${API_URL_BASE}/contacts`

class CordialApi {

  constructor (client) {
    this.client = client
  }

  async getContact (email) {
    console.log('getContact Was called with email: ', email)
    const encodedEmail = encodeURIComponent(email.toLowerCase());
    const settings = {
      url: `${API_URL_CONTACT}/email:${encodedEmail}`,
      headers: {
        "Authorization": "Basic {{setting.api_token}}",
        "Accept": "application/json"
      },
      secure: true,
      type: 'GET'
    };

    return await this.client.request(settings)
      .catch((error) => {
        console.log(error)
      })
  }

  async updateContact (email, data) {
    console.log('updateContact Was called with: ', email, data)
    const encodedEmail = encodeURIComponent(email.toLowerCase());
    const settings = {
      url: `${API_URL_CONTACT}/email:${encodedEmail}`,
      headers: {
        "Authorization": "Basic {{setting.api_token}}",
        "Accept": "application/json"
      },
      data: data,
      secure: true,
      type: 'PUT'
    };
    return (await this.client.request(settings))
  }

  async createContact (email, data) {
    console.log('createContact Was called with: ', email, data)
    const settings = {
      url: API_URL_CONTACT,
      headers: {
        "Authorization": "Basic {{setting.api_token}}",
        "Accept": "application/json"
      },
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
      console.log('exception happening', exception)
      if (exception?.responseJSON?.errorKey === 'CONTACTS_CONTACT_NOT_FOUND') {
        console.log('here')
        return (await this.createContact(email, data))
      }
      console.log('Something went wrong')
    }
  }
}

export default CordialApi
