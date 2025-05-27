export default class Api {
  constructor({ baseUrl }) {
    this._apiurl = baseUrl;
    this._options = {
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  _genericFetch({ method = "GET", endpoint, body }) {
    const fetchOptions = { ...this._options, method };
    if (body) fetchOptions.body = JSON.stringify(body);
    return fetch(`${this._apiurl}/${endpoint}`, fetchOptions).then((result) => {
      if (result.ok) {
        return result.json();
      }
      return Promise.reject(`Error: ${result.status}`);
    });
  }

  getItems(endpoint = "items") {
    return this._genericFetch({ endpoint });
  }

  deleteItem(endpoint) {
    return this._genericFetch({
      method: "DELETE",
      endpoint: `items/${endpoint}`,
    });
  }

  addItem(body) {
    return this._genericFetch({ method: "POST", endpoint: "items", body });
  }
}
