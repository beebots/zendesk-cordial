const auth_headers = {
  "Authorization": "Basic {{setting.api_token}}",
  "Accept": "application/json"
}

class CordialApi {
  constructor (client, apiUrl) {
    this.client = client
    this.apiUrl = `${apiUrl}/v2`
    this.apiUrlContact = `${this.apiUrl}/contacts`
    this.apiUrlContactAttributes = `${this.apiUrl}/accountcontactattributes`
    this.apiUrlContactActivities = `${this.apiUrl}/contactactivities`
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

  async getAllContactAttributes () {
    const settings = {
      url: `${this.apiUrlContactAttributes}`,
      headers: auth_headers,
      secure: true,
      type: 'GET'
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

  async getEventsByContact (email, perPage = 5) {
    const encodedEmail = encodeURIComponent(email.toLowerCase());
    const settings = {
      url: `${this.apiUrlContactActivities}?email=${encodedEmail}&per_page=${perPage}&return_count=false&sort_dir=desc`,
      headers: auth_headers,
      secure: true,
      type: 'GET'
    };

    return (await this.client.request(settings))
  }

}

export default CordialApi
