const baseUrl =
  process.env.NODE_ENV === "production"
    ? import.meta.env.VITE_BACKEND_API
    : "http://localhost:3001";

class ApiDb {
  constructor({ baseUrl }) {
    this._apiurl = baseUrl;
    this._options = {
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  _genericFetch({ method = "GET", endpoint, token, body }) {
    const fetchOptions = { ...this._options, method };
    if (body) fetchOptions.body = JSON.stringify(body);
    if (token) fetchOptions.headers.authorization = `Bearer ${token}`;
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

  deleteItem(token, endpoint) {
    return this._genericFetch({
      method: "DELETE",
      endpoint: `items/${endpoint}`,
      token,
    });
  }

  addItem(token, body) {
    return this._genericFetch({
      method: "POST",
      endpoint: "items",
      token,
      body,
    });
  }

  updateUserProfile(token, body) {
    return this._genericFetch({
      method: "PATCH",
      endpoint: "users/me",
      token,
      body,
    });
  }

  addCardLike(token, endpoint) {
    return this._genericFetch({
      method: "PUT",
      endpoint: `items/${endpoint}/likes`,
      token,
    });
  }

  removeCardLike(token, endpoint) {
    return this._genericFetch({
      method: "DELETE",
      endpoint: `items/${endpoint}/likes`,
      token,
    });
  }
}

export const getApiDb = () =>
  new ApiDb({
    baseUrl,
  });
