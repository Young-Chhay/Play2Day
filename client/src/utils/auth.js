import decode from 'jwt-decode';

// create a new class to instantiate for a user
class AuthService {
    getProfile() {
        return decode(this.getToken());
    }

    // checking if user is logged in
    loggedIn() {
        const token = this.getToken();
        // If there is a token and it's not expire, return 'true'
        return token && !this.isTokenExpired(token) ? true: false;
    }

    // checking if token is expiredy
    isTokenExpired(token) {
        // Decode the token to get its expiration time that was set by the server
        const decoded = decode(token);
        // If the expiration time is less than the current time (in seconds), the token is expired and we return `true`
        if (decoded.exp < Date.now() / 1000) {
        localStorage.removeItem('id_token');
        return true;
        }
        // If token hasn't passed its expiration time, return `false`
        return false;
    }

    getToken() {
        // get token from local storage
        return localStorage.getItem('id_token');
    }

    login(idToken) {
         // save token to local storage
         localStorage.setItem('id_token', idToken);
         window.location.assign('/');
     }

    logout() {
        // clear token and profile
        localStorage.removeItem('id_token');
        window.location.assign('/')
    }
}

export default new AuthService();