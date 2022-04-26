const API_URL_BASE = 'https://api.usw2.cordial.io/v2' //TODO : pull from settings
const API_URL_CONTACT_GET = `${API_URL_BASE}/contacts`

class CordialApi {

  constructor (client) {
    this.client = client
  }

  async getContact (email) {
    console.log('getContact Was called with email: ', email)
    const encodedEmail = encodeURIComponent(email.toLowerCase());
    const settings = {
      url: `${API_URL_CONTACT_GET}/email:${encodedEmail}`,
      headers: {
        "Authorization": "Basic {{setting.api_token}}",
        "Accept": "application/json"
      },
      secure: true,
      type: 'GET'
    };
    console.log(settings);
    let contactData = (await this.client.request(settings))
    console.log(contactData);

    return contactData
  }
}

export default CordialApi
