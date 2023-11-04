import axios from "axios";

const API_URL = process.env.REACT_APP_API_AUTH_URL;

class AuthService {
  async login(email, password) {
    return axios
      .post(API_URL + "signin", {
        email,
        password
      })
      .then((response) => {
        if (response.data.access_token) {
          const expirationTime = new Date().getTime() + 60 * 60 * 1000;
          localStorage.setItem("access_token", response.data.access_token);
          localStorage.setItem("token_expiration", expirationTime);
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("token_expiration");
  }

  async register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    return localStorage.getItem('access_token');
  }

  isTokenValid() {
    const tokenExpiration = localStorage.getItem("token_expiration");
    return tokenExpiration && parseInt(tokenExpiration, 10) > new Date().getTime();
  }
}

export default new AuthService();